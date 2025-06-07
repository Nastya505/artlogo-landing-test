import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface OrderOption {
  id: string;
  type: 'radio' | 'checkboxes' | 'text_input' | 'dropdown' | 'file_upload' | 'swatches';
  label: string;
  required?: boolean;
  tooltip?: string;
  options?: string[];
  price?: number;
  priceType?: 'fixed' | 'percentage';
}

export interface OrderProduct {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  options: OrderOption[];
}

export interface OrderData {
  productId: string;
  selectedOptions: Record<string, any>;
  totalPrice: number;
  customerInfo: {
    email: string;
    name: string;
    phone?: string;
  };
}

export const useOrderStore = defineStore('order', () => {
  // State
  const currentProduct = ref<OrderProduct | null>(null);
  const selectedOptions = ref<Record<string, any>>({});
  const customerInfo = ref({
    email: '',
    name: '',
    phone: '',
  });
  const errors = ref<Record<string, string>>({});
  const isLoading = ref(false);

  // Computed
  const totalPrice = computed(() => {
    let price = currentProduct.value?.basePrice || 0;

    if (currentProduct.value) {
      currentProduct.value.options.forEach((option) => {
        const selectedValue = selectedOptions.value[option.id];
        if (selectedValue && option.price) {
          if (option.priceType === 'percentage') {
            price += (price * option.price) / 100;
          } else {
            price += option.price;
          }
        }
      });
    }

    return price;
  });

  const orderData = computed((): OrderData => ({
    productId: currentProduct.value?.id || '',
    selectedOptions: selectedOptions.value,
    totalPrice: totalPrice.value,
    customerInfo: customerInfo.value,
  }));

  // Actions
  function setProduct(product: OrderProduct) {
    currentProduct.value = product;
    selectedOptions.value = {};
    errors.value = {};
  }

  function updateOption(optionId: string, value: any) {
    selectedOptions.value[optionId] = value;
    // Clear error when user updates the field
    if (errors.value[optionId]) {
      delete errors.value[optionId];
    }
  }

  function updateCustomerInfo(info: Partial<typeof customerInfo.value>) {
    Object.assign(customerInfo.value, info);
  }

  function validateOrder(): boolean {
    errors.value = {};

    if (!currentProduct.value) {
      return false;
    }

    // Validate required options
    currentProduct.value.options.forEach((option) => {
      if (option.required && !selectedOptions.value[option.id]) {
        errors.value[option.id] = 'This field is required';
      }
    });

    // Validate customer info
    if (!customerInfo.value.email) {
      errors.value.email = 'Email is required';
    }
    if (!customerInfo.value.name) {
      errors.value.name = 'Name is required';
    }

    return Object.keys(errors.value).length === 0;
  }

  function resetOrder() {
    currentProduct.value = null;
    selectedOptions.value = {};
    customerInfo.value = { email: '', name: '', phone: '' };
    errors.value = {};
    isLoading.value = false;
  }

  return {
    // State
    currentProduct,
    selectedOptions,
    customerInfo,
    errors,
    isLoading,

    // Computed
    totalPrice,
    orderData,

    // Actions
    setProduct,
    updateOption,
    updateCustomerInfo,
    validateOrder,
    resetOrder,
  };
});
