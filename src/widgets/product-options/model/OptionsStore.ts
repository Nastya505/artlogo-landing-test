import type { ProductCustomParameters, ProductVariantToAddToCart } from '../model/types';

import type { ProductOption, ProductOptionsSection } from './types';

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { validationSchemas } from './types';

// Simple random string generator
function randomString(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Store for product options
 */
export const useOptionsStore = defineStore('productOptions', () => {
  // Reactive section reference
  const sectionData = ref<ProductOptionsSection | null>(null);

  // Main product state
  const mainProduct = ref({
    title: 'Loading...',
    variantId: 0,
    price: 0,
    compareAtPrice: 0,
    customParams: {} as ProductCustomParameters,
    quantity: 1,
  });

  async function initializeSection() {
    try {
      // Dynamic import to avoid circular dependency
      const { getProductData } = await import('../lib/product-data-provider');
      const section = getProductData();

      section.optionsSet.forEach((option: ProductOption) => {
        if (
          'cart_label' in option
          && !option.cart_label
          && option.type !== 'condition'
          && option.type !== 'cart_total'
        ) {
          // add cart_label if it's not set
          // will be used for technical purposes
          option.cart_label = randomString();
          option.send_value_to_cart = false;
        }
      });
      sectionData.value = section;

      // Initialize main product data
      if (section.product && section.product.variants.length > 0) {
        mainProduct.value = {
          title: section.product.title,
          variantId: section.product.variants[0].id,
          price: section.product.variants[0].price,
          compareAtPrice: section.product.variants[0].compare_at_price,
          customParams: {} as ProductCustomParameters,
          quantity: 1,
        };
      }
    } catch (error) {
      console.warn('Product data not yet initialized:', error);
    }
  }

  function setMainProduct(newValue: Omit<typeof mainProduct.value, 'customParams'>) {
    mainProduct.value = { ...mainProduct.value, ...newValue };
  }

  // Update main product when artist level changes
  async function updateVariantFromSelection(artistLevel: string) {
    try {
      const { getVariantBySelection } = await import('../lib/product-data-provider');
      const variant = getVariantBySelection(artistLevel);
      if (variant) {
        mainProduct.value.variantId = variant.id;
        mainProduct.value.price = variant.price;
        mainProduct.value.compareAtPrice = variant.compare_at_price;
      }
    } catch (error) {
      console.warn('Cannot update variant, data not initialized:', error);
    }
  }

  const errors = ref<Record<string, string>>({});

  function validateOption(option: ProductOption): boolean {
    if ('is_required' in option && 'cart_label' in option && option.is_required) {
      const value = mainProduct.value.customParams[option.cart_label];
      if (value === undefined || value === null || value === '') {
        errors.value[option.cart_label] = 'This field is required';
        return false;
      }
    }

    if (option.type === 'text_input' && 'validation_type' in option && option.validation_type) {
      const schema = validationSchemas[option.validation_type];
      const { error } = schema.safeParse(mainProduct.value.customParams['cart_label' in option ? option.cart_label : '']);
      const issue = error?.issues[0];
      if (issue && 'cart_label' in option) {
        errors.value[option.cart_label] = issue.message;
        return false;
      }
    }

    if ('cart_label' in option) {
      delete errors.value[option.cart_label];
    }
    return true;
  }

  function validateAllOptions(): boolean {
    if (!sectionData.value) {
      return false;
    }
    const validationResults = sectionData.value.optionsSet.map((option: ProductOption) => validateOption(option));
    return validationResults.every((res: boolean) => !!res);
  }

  const addonsPrices = ref<{ price: number; compare_at_price: number }>({ price: 0, compare_at_price: 0 });
  const addonsToAddToCart = ref<ProductVariantToAddToCart[]>([]);

  const cartTotal = computed(() => {
    if (!sectionData.value) {
      return { price: mainProduct.value.price, compare_at_price: mainProduct.value.compareAtPrice };
    }

    // Суммируем цену основного продукта и всех выбранных аддонов
    const addonsPrice = addonsToAddToCart.value.reduce((sum, addon) => sum + (addon.price * addon.quantity), 0);

    return {
      price: mainProduct.value.price + addonsPrice,
      compare_at_price: mainProduct.value.compareAtPrice + addonsPrice,
    };
  });

  const lineItems = computed<ProductVariantToAddToCart[]>(() => {
    const currentProductCustomParams = { ...mainProduct.value.customParams };

    if (sectionData.value) {
      Object.keys(currentProductCustomParams).forEach((key) => {
        // remove empty values & properties without cart labels
        const isEmptyValue = !currentProductCustomParams[key];
        const shouldSendValueToCart = sectionData.value!.optionsSet.some((option: ProductOption) => 'cart_label' in option && 'send_value_to_cart' in option && option.cart_label === key && option.send_value_to_cart);
        if (isEmptyValue || !shouldSendValueToCart) {
          delete currentProductCustomParams[key];
        }

        // if it's a multiline text, join it with number of lines
        if (currentProductCustomParams[key]?.includes('\n')) {
          const lines = currentProductCustomParams[key]?.split('\n');
          currentProductCustomParams[key] = '';
          lines?.forEach((line, index) => {
            currentProductCustomParams[key] += `(${index + 1}) ${line} `;
          });
        }
      });
    }

    return [
      {
        id: mainProduct.value.variantId,
        quantity: mainProduct.value.quantity,
        price: cartTotal.value.price,
        properties: currentProductCustomParams,
        title: mainProduct.value.title,
      },
      ...addonsToAddToCart.value,
    ];
  });

  // Computed section getter
  const section = computed(() => sectionData.value || {
    product: { title: 'Loading...', variants: [] },
    showPadding: true,
    showBackgroundColor: false,
    backgroundColor: '#ffffff',
    heading: 'Choose Your Options',
    currency_message_mode: 'dollars' as const,
    optionsSet: [],
  });

  return {
    section,
    sectionData,
    initializeSection,
    mainProduct,
    setMainProduct,
    updateVariantFromSelection,

    errors,
    validateOption,
    validateAllOptions,

    addonsToAddToCart,
    addonsPrices,
    cartTotal,
    lineItems,
  };
});
