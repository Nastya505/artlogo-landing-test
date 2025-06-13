<script setup lang="ts">
import type { ProductOption, UploadFileWithTextInputOption } from './model/types';

// import { currenciesWithDollarSymbol } from '@/shared/lib/money';
import { useEventListener } from '@vueuse/core';

import { ElSkeleton, ElSkeletonItem } from 'element-plus';
import { computed, defineAsyncComponent, onMounted, watch } from 'vue';

import { useOptionsStore } from './model/OptionsStore';

useEventListener('pageshow', (event) => {
  // If the page is being loaded from the bfcache, reload it
  if (event.persisted) {
    window.location.reload();
  }
});

const CartTotal = defineAsyncComponent(() => import('./ui/CartTotal.vue'));
const PaymentButtons = defineAsyncComponent(() => import('./ui/PaymentButtons/PaymentButtons.vue'));
const ProductSwitch = defineAsyncComponent(() => import('./ui/ProductSwitch.vue'));
const Swatches = defineAsyncComponent(() => import('./ui/Swatches.vue'));
const TextInput = defineAsyncComponent(() => import('./ui/TextInput.vue'));
const PaymentTrusts = defineAsyncComponent(() => import('./ui/PaymentTrusts.vue'));
const VariantSelector = defineAsyncComponent(() => import('./ui/VariantSelector.vue'));
const FileUploaderOption = defineAsyncComponent(() => import('./ui/FileUploaderOption.vue'));

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
    case 'product_switch':
      return option.active_by_default?.toString() ?? '';
    default:
      return '';
  }
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
      const option = optionsStore.section.optionsSet.find(
        (option: ProductOption) => 'cart_label' in option && option.cart_label === cartLabel,
      );
      if (!option) {
        return;
      }

      const optionValue = optionsValues[cartLabel];

      switch (option.type) {
        case 'product_switch':
          if (optionValue === 'true') {
            optionsStore.addonsPrices!.price += option.product_price;
            optionsStore.addonsPrices!.compare_at_price += Math.max(
              option.product_compare_at_price,
              option.product_price,
            );
            if (
              option.product_variant_id !== undefined
              && option.product_variant_id !== null
            ) {
              optionsStore.addonsToAddToCart.push({
                id: option.product_variant_id,
                quantity: 1,
                price: option.product_price,
                title: option.product_label,
              });
            }
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
    .filter((option: ProductOption) => option.type !== 'condition');
  return options;
});

watch(
  optionsToShow,
  (newVal, oldVal) => {
    newVal.forEach((option: ProductOption) => {
      if ('cart_label' in option && !(option.cart_label in optionsStore.mainProduct.customParams)) {
        const initialValue = getInitialOptionValue(option);

        optionsStore.mainProduct.customParams[option.cart_label] = initialValue;
        if (option.cart_label === 'artist_level') {
          optionsStore.updateVariantFromSelection(initialValue);
        }
      }
    });
    oldVal?.forEach((option: ProductOption) => {
      if ('cart_label' in option && !newVal.includes(option as any)) {
        delete optionsStore.mainProduct.customParams[option.cart_label];
      }
    });
  },
  { immediate: true, deep: true },
);

const groupedOptions = computed(() => {
  const options = optionsToShow.value.slice();
  const fileUploader = options.find((opt: ProductOption) => opt.type === 'file_uploader');
  const largeTextInput = options.find((opt: ProductOption) => opt.type === 'large_text_input');

  if (fileUploader || largeTextInput) {
    const filtered = options.filter(
      (opt: ProductOption) => opt.type !== 'file_uploader' && opt.type !== 'large_text_input',
    );

    const group = {
      type: 'upload_file_with_text_input',
      fileUploader,
      largeTextInput,
    };

    if (filtered.length >= 4) {
      filtered.splice(4, 0, group as UploadFileWithTextInputOption);
    } else {
      filtered.push(group as UploadFileWithTextInputOption);
    }

    return filtered;
  }

  return options;
});
</script>

<template>
  <div class="max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8 space-y-16 lg:space-y-32">
    <template v-for="option in groupedOptions" :key="('cart_label' in option ? option.cart_label : option.type)">
      <CartTotal v-if="option.type === 'cart_total'" class="mt-20 md:mt-40" />
      <PaymentTrusts v-else-if="option.type === 'payment_trusts'" class="!mt-10 md:!mt-20" />
      <PaymentButtons v-else-if="option.type === 'payment_buttons'" :option="option" />

      <ProductSwitch
        v-else-if="option.type === 'product_switch' && optionsToShow.includes(option)"
        :option="option"
      />

      <div
        v-else-if="option.type === 'upload_file_with_text_input'"
        class="w-full"
      >
        <h2 class="text-3xl text-center md:text-5xl font-normal text-white mb-5 md:mb-10 leading-tight">
          Help us design your perfect logo
        </h2>
        <div class="flex flex-col md:flex-row gap-6 md:gap-8 w-full items-start justify-center">
          <div v-if="option.largeTextInput" class="flex-1 w-full">
            <TextInput
              v-model="optionsStore.mainProduct.customParams[option.largeTextInput.cart_label]"
              :option="option.largeTextInput"
            />
          </div>
          <FileUploaderOption
            v-if="option.fileUploader"
            :option="option.fileUploader"
            :accept="option.fileUploader.accept"
          />
        </div>
      </div>

      <div
        v-else-if="optionsToShow.includes(option)"
        class="product-option"
        :class="{ 'product-option--with-bg': option.show_background_color }"
        :style="option.show_background_color ? { backgroundColor: option.background_color } : {}"
        :data-cart-label="('cart_label' in option ? option.cart_label : undefined)"
      >
        <h5 v-if="option.product_label" class="block text-white text-center font-medium m-5 md:mb-10 text-xl md:text-3xl">
          {{ option.product_label }}
        </h5>

        <Suspense :timeout="500">
          <Swatches v-if="option.type === 'swatches'" :option="option" />
          <TextInput v-else-if="option.type === 'text_input'" class="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8" :option="option" />
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
          <div v-if="'cart_label' in option && optionsStore.errors[option.cart_label]" class="text-orange-500 text-center mt-3 text-xl">
            {{ optionsStore.errors[option.cart_label] }}
          </div>
        </Transition>
      </div>
    </template>
  </div>
</template>
