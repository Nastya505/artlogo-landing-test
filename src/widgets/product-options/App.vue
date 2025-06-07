<script setup lang="ts">
import type { ConditionOption, ProductOption } from './model/types';

// import { currenciesWithDollarSymbol } from '@/shared/lib/money';
import { useEventListener } from '@vueuse/core';

import { ElSkeleton, ElSkeletonItem, ElTooltip } from 'element-plus';
import { computed, defineAsyncComponent, watch } from 'vue';

import { useCurrency } from './lib/currency-provider';
import { useQueryParamsStore } from './lib/url-params.store';
import { useOptionsStore } from './model/OptionsStore';

const queryParamsStore = useQueryParamsStore();

useEventListener('pageshow', (event) => {
  // If the page is being loaded from the bfcache, reload it
  if (event.persisted) {
    window.location.reload();
  }
});

const CartTotal = defineAsyncComponent(() => import('./ui/CartTotal.vue'));
// const PaymentButtons = defineAsyncComponent(() => import('./ui/PaymentButtons/PaymentButtons.vue'));
const Checkboxes = defineAsyncComponent(() => import('./ui/Checkboxes.vue'));
// const FileUploaderOption = defineAsyncComponent(() => import('./ui/FileUploaderOption.vue'));
const ProductSwitch = defineAsyncComponent(() => import('./ui/ProductSwitch.vue'));
const PricingRadio = defineAsyncComponent(() => import('./ui/PricingRadio.vue'));
const Swatches = defineAsyncComponent(() => import('./ui/Swatches.vue'));
const TextInput = defineAsyncComponent(() => import('./ui/TextInput.vue'));
const PaymentTrusts = defineAsyncComponent(() => import('./ui/PaymentTrusts.vue'));

const optionsStore = useOptionsStore();

function getInitialOptionValue(option: ProductOption) {
  switch (option.type) {
    case 'radio':
      return option.options[0];
    case 'product_switch':
      return option.active_by_default.toString();
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
      if (!optionsStore.mainProduct.customParams[option.cart_label]) {
        let initialValue = getInitialOptionValue(option);
        if (option.url_param_key) {
          initialValue = String(queryParamsStore.get(option.url_param_key)) || initialValue;
          queryParamsStore.del(option.url_param_key);
        }
        optionsStore.mainProduct.customParams[option.cart_label] = initialValue;
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
  <div
    class="product-options"
    :class="{ 'product-options--with-padding': optionsStore.section.showPadding && optionsToShow.length }"
    :style="optionsStore.section.showBackgroundColor ? { backgroundColor: optionsStore.section.backgroundColor } : {}"
    wg-dynamic
  >
    <div class="product-options__container">
      <template v-for="option in optionsStore.section.optionsSet" :key="option.cart_label">
        <CartTotal v-if="option.type === 'cart_total'" />
        <PaymentTrusts v-else-if="option.type === 'payment_trusts'" />
        <!-- <PaymentButtons v-else-if="option.type === 'payment_buttons'" :option="option" /> -->

        <ProductSwitch v-else-if="option.type === 'product_switch' && optionsToShow.includes(option)" :option="option" />

        <div
          v-else-if="optionsToShow.includes(option as any)"
          class="product-option max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8"
          :class="{ 'product-option--with-bg': option.show_background_color }"
          :style="option.show_background_color ? { backgroundColor: option.background_color } : {}"
          :data-cart-label="option.cart_label"
        >
          <h5 v-if="option.product_label" class="block text-white text-center font-medium mb-3 text-xl md:text-3xl">
            {{ option.product_label }}
          </h5>

          <Suspense :timeout="500">
            <PricingRadio v-if="option.type === 'radio'" :option="option" />
            <Checkboxes v-else-if="option.type === 'checkboxes'" :option="option" />
            <Swatches v-else-if="option.type === 'swatches'" class=" mt-20 md:mt-40" :option="option" />
            <TextInput v-else-if="option.type === 'text_input'" class="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8" :option="option" />
            <!-- <FileUploaderOption v-else-if="option.type === 'file_uploader'" :option="option" /> -->

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
  </div>
</template>

<style scoped lang="scss">
// @use '@artlogo-design/vars';

.product-options {
  &--with-padding {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }

  &__container {
    > * + * {
      margin-top: 3rem;
    }
  }

  &__header {
    margin-bottom: 2rem;
    font-size: 1rem;
    text-align: center;
  }

  &__heading {
    font-size: 1.5em;
    margin-bottom: 0;
  }

  &__currency-message {
    font-size: 1em;
    margin-top: 0.3em;
    margin-bottom: 0;
  }

  &__currency-message-code {
    font-size: 0.8em;
    padding: 0.2em 0.2em;
    background-color: #a7a7a7;
    color: #fff;
    border-radius: 0.3em;
  }
}

.product-option {
  border-radius: 2.5rem;
  color: #fff;
  text-align: center;
  font-size: 1rem;

  &--with-bg {
    padding: 2.5rem 2rem;
  }

  &__label {
    font-size: 1.5em;
    line-height: 1.2;
    margin-bottom: 0.7em;
    padding: 0;
  }

  &__tooltip {
    font-size: 0.6em;
    vertical-align: middle;
  }
}

// @media (min-width: vars.$media-s-min) {
//   .product-options {
//     &__header {
//       font-size: 1.5rem;
//     }

//     &__currency-message {
//       font-size: 0.8em;
//     }
//   }
// }

// @media (min-width: vars.$media-m-min) {
//   .product-options {
//     &__header {
//       font-size: 1.8rem;
//     }
//   }
// }

// @media (min-width: vars.$media-l-min) {
//   .product-options {
//     &__container {
//       > * + * {
//         margin-top: 5rem;
//       }
//     }
//   }

  // .product-option {
  //   font-size: 1.8rem;
  // }
// }
</style>
