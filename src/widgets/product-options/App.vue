<script setup lang="ts">
import type { ConditionOption, ProductOption } from './model/types';

// import { currenciesWithDollarSymbol } from '@/shared/lib/money';
import { useEventListener } from '@vueuse/core';

import { ElSkeleton, ElSkeletonItem } from 'element-plus';
import { computed, defineAsyncComponent, watch } from 'vue';

import { useOptionsStore } from './model/OptionsStore';

useEventListener('pageshow', (event) => {
  // If the page is being loaded from the bfcache, reload it
  if (event.persisted) {
    window.location.reload();
  }
});

const CartTotal = defineAsyncComponent(() => import('./ui/CartTotal.vue'));
// const PaymentButtons = defineAsyncComponent(() => import('./ui/PaymentButtons/PaymentButtons.vue'));
const UploadWithComment = defineAsyncComponent(() => import('./ui/UploadWithComment.vue'));
const ProductSwitch = defineAsyncComponent(() => import('./ui/ProductSwitch.vue'));
// const PricingRadio = defineAsyncComponent(() => import('./ui/PricingRadio.vue'));
const Swatches = defineAsyncComponent(() => import('./ui/Swatches.vue'));
const TextInput = defineAsyncComponent(() => import('./ui/TextInput.vue'));
const PaymentTrusts = defineAsyncComponent(() => import('./ui/PaymentTrusts.vue'));
const VariantSelector = defineAsyncComponent(() => import('./ui/VariantSelector.vue'));

const optionsStore = useOptionsStore();

const saved = typeof window !== 'undefined' ? localStorage.getItem('signatureData') : null;
if (saved) {
  const formData = JSON.parse(saved);
  optionsStore.mainProduct.customParams = {
    ...optionsStore.mainProduct.customParams,
    ...(formData.signature_name ? { signature_name: formData.signature_name } : {}),
    ...(formData.special_instructions ? { special_instructions: formData.special_instructions } : {}),
  };
}

function getInitialOptionValue(option: ProductOption) {
  switch (option.type) {
    case 'radio': {
      return option.options[1];
    }
    case 'product_switch':
      return option.active_by_default?.toString() ?? '';
    default:
      return '';
  }
}

function checkOptionForPassingConditions(optionToCheck: ProductOption) {
  const conditions = optionsStore.section.optionsSet.filter((option: ProductOption) =>
    option.type === 'condition'
    && option.apply_to_label_on_cart === optionToCheck.cart_label,
  ) as ConditionOption[];

  return conditions.every((cond) => {
    // get all options' values on the page
    const optionValue = optionsStore.mainProduct.customParams[cond.condition_label_on_cart];

    if (cond.condition_type === 'show') {
      switch (cond.condition_comparing_method) {
        case 'contains':
          return optionValue?.includes(cond.condition_label_on_cart_value);
        case 'is':
          return optionValue === cond.condition_label_on_cart_value;
        case 'is_not':
          return optionValue !== cond.condition_label_on_cart_value;
      }
    } else {
      switch (cond.condition_comparing_method) {
        case 'contains':
          return !optionValue?.includes(cond.condition_label_on_cart_value);
        case 'is':
          return optionValue !== cond.condition_label_on_cart_value;
        case 'is_not':
          return optionValue === cond.condition_label_on_cart_value;
      }
    }
    return true;
  });
}

/**
 * @todo: refactor this (don't use watcher)
 */
watch(
  () => optionsStore.mainProduct.customParams,
  (optionsValues) => {
    optionsStore.addonsToAddToCart = [];
    optionsStore.addonsPrices = { price: 0, compare_at_price: 0 };

    // Update variant when artist level changes
    if (optionsValues.artist_level) {
      optionsStore.updateVariantFromSelection(optionsValues.artist_level);
    }

    Object.keys(optionsValues).forEach((cartLabel) => {
      const option = optionsStore.section.optionsSet.find((option: ProductOption) => option.cart_label === cartLabel);

      if (!option) {
        return;
      }

      const optionValue = optionsValues[cartLabel];

      switch (option.type) {
        case 'radio':
          if (
            option.product_variant_id
            && option.add_product_condition
            && option.add_product_condition === optionValue
          ) {
            optionsStore.addonsPrices!.price += option.product_price;
            optionsStore.addonsPrices!.compare_at_price += Math.max(
              option.product_compare_at_price,
              option.product_price,
            );
            optionsStore.addonsToAddToCart.push({
              id: option.product_variant_id,
              quantity: 1,
              price: option.product_price,
              title: option.product_title,
            });
          }
          break;
        case 'product_switch':
          if (optionValue === 'true') {
            optionsStore.addonsPrices!.price += option.product_price;
            optionsStore.addonsPrices!.compare_at_price += Math.max(
              option.product_compare_at_price,
              option.product_price,
            );
            optionsStore.addonsToAddToCart.push({
              id: option.product_variant_id,
              quantity: 1,
              price: option.product_price,
              title: option.product_title,
            });
          };
          break;
      }
    });
  },
  { immediate: true, deep: true },
);

// filter options & apply conditions
const optionsToShow = computed(() => {
  const options = optionsStore.section.optionsSet
    .filter((option: ProductOption) => option.type !== 'condition')
    .filter((option: ProductOption) => checkOptionForPassingConditions(option));
  return options;
});

watch(
  optionsToShow,
  (newVal, oldVal) => {
    newVal.forEach((option: ProductOption) => {
      if (!(option.cart_label in optionsStore.mainProduct.customParams)) {
        const initialValue = getInitialOptionValue(option);

        optionsStore.mainProduct.customParams[option.cart_label] = initialValue;
        // Явно обновляем вариант, если это тариф
        if (option.cart_label === 'artist_level') {
          optionsStore.updateVariantFromSelection(initialValue);
        }
      }
    });
    oldVal?.forEach((option: ProductOption) => {
      if (!newVal.includes(option as any)) {
        delete optionsStore.mainProduct.customParams[option.cart_label];
      }
    });
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <div class="max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8 space-y-16 lg:space-y-32">
    <template v-for="option in optionsStore.section.optionsSet" :key="option.cart_label">
      <CartTotal v-if="option.type === 'cart_total'" class="mt-20 md:mt-40" />
      <PaymentTrusts v-else-if="option.type === 'payment_trusts'" />
      <!-- <PaymentButtons v-else-if="option.type === 'payment_buttons'" :option="option" /> -->

      <ProductSwitch
        v-else-if="option.type === 'product_switch' && optionsToShow.includes(option)"
        :option="option"
      />

      <div
        v-else-if="optionsToShow.includes(option as any)"
        class="product-option"
        :class="{ 'product-option--with-bg': option.show_background_color }"
        :style="option.show_background_color ? { backgroundColor: option.background_color } : {}"
        :data-cart-label="option.cart_label"
      >
        <h5 v-if="option.product_label" class="block text-white text-center font-medium   m-5 md:mb-10 text-xl md:text-3xl">
          {{ option.product_label }}
        </h5>

        <Suspense :timeout="500">
          <Swatches v-if="option.type === 'swatches'"  :option="option" />
          <TextInput v-else-if="option.type === 'text_input'" class="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8" :option="option" />
          <UploadWithComment
            v-else-if="option.type === 'file_uploader' || option.type === 'large_text_input'"
            text-cart-label="reference_comment"
          />
          <VariantSelector v-else-if="option.type === 'variant_selector'" :option="option" />

          <template #fallback>
            <ElSkeleton loading animated>
              <template #template>
                <ElSkeletonItem v-if="option.type === 'text_input'" variant="rect" class="!h-16 max-w-3xl" />
                <ElSkeletonItem v-else-if="option.type === 'large_text_input'" variant="rect" class="!h-60 max-w-2xl" />
                <template v-else>
                  <ElSkeletonItem variant="rect" class="!h-16" />
                  <ElSkeletonItem variant="rect" class="!h-16 mt-4" />
                </template>
              </template>
            </ElSkeleton>
          </template>
        </Suspense>

        <Transition name="fade">
          <div v-if="optionsStore.errors[option.cart_label]" class="text-danger-red mt-3 text-xl">
            {{ optionsStore.errors[option.cart_label] }}
          </div>
        </Transition>
      </div>
    </template>
  </div>
</template>
