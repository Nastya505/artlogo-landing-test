<script setup lang="ts">
import type { OptionBase } from '../model/types';

import { AppButton } from '@/shared/ui';
import { useMediaQuery } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useOptionsStore } from '../model/OptionsStore';

export interface SwatchesOption extends OptionBase {
  type: 'swatches';
  options: {
    background: string;
    value: string;
  }[];
  min_selections: number | null;
  max_selections: number | null;
  desktop_paginate_by: number;
  mobile_paginate_by: number;
  paginate_button_text: string;
  show_all_after_first_pagination: boolean;
}

const props = defineProps<{ option: SwatchesOption }>();

const optionsStore = useOptionsStore();

function onChange(option: SwatchesOption, newValue: string, isChecked: boolean) {
  if (option.max_selections === 1) {
    optionsStore.mainProduct.customParams[option.cart_label] = newValue;
  } else {
    let currentValue = (optionsStore.mainProduct.customParams[option.cart_label] || '')
      .split(/,\s*/g)
      .filter(value => value)
      .filter(value => option.options.map(option => option.value).includes(value));

    if (currentValue.length === option.max_selections && isChecked) {
      return;
    }

    if (currentValue.includes(newValue)) {
      currentValue = currentValue.filter(value => value !== newValue);
    }

    if (isChecked) {
      currentValue.push(newValue);
    }

    optionsStore.mainProduct.customParams[option.cart_label] = currentValue.join(', ');
  }
}

const isDesktop = useMediaQuery('(min-width: 768px)');
const paginateBy = computed(() => (isDesktop.value ? props.option.desktop_paginate_by : props.option.mobile_paginate_by));

const optionsToShowNumber = ref(paginateBy.value);

const optionsToShow = computed(() => {
  const options = props.option.options;
  if (optionsToShowNumber.value === 0) {
    return options;
  } else {
    return options.slice(0, Math.min(optionsToShowNumber.value, options.length));
  }
});

function showMoreOptions() {
  if (props.option.show_all_after_first_pagination) {
    optionsToShowNumber.value = props.option.options.length;
  } else {
    optionsToShowNumber.value += paginateBy.value;
  }
}

const selectedValues = computed(() => {
  const raw = optionsStore.mainProduct.customParams[props.option.cart_label] || '';
  return raw.split(',').map(s => s.trim());
});
</script>

<template>
  <div class="flex justify-center flex-wrap -mt-4">
    <h2 class="text-3xl md:text-5xl font-normal text-white mb-5 md:mb-10 leading-tight">
      Select up to 4 logo styles you like (click to choose)
    </h2>
    <div class="flex justify-center flex-wrap gap-4 w-full">
      <label
        v-for="sw_option in optionsToShow"
        :key="sw_option.value"
        class="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] aspect-square rounded-lg overflow-hidden cursor-pointer relative transition-all duration-300"
      >
        <input
          :type="option.max_selections === null || option.max_selections > 1 ? 'checkbox' : 'radio'"
          class="sr-only"
          @change="onChange(option, sw_option.value, ($event.target as HTMLInputElement).checked)"
        >
        <img
          :src="sw_option.background"
          :alt="sw_option.value"
          class="w-full h-full object-cover object-center rounded-3xl"
        >
        <div v-if="selectedValues.includes(sw_option.value)" class="absolute top-5 left-5 w-20 h-20  rounded-full flex items-center justify-center shadow-lg">
          <img src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/check.svg" alt="Selected" class="w-full h-full">
        </div>
      </label>
    </div>
    <AppButton
      class="mt-16"
      :text="option.paginate_button_text"
      variant="primary"
      size="lg"
      @click="showMoreOptions"
    />
  </div>
</template>
