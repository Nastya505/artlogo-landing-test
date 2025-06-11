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
    is_popular: boolean;
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
    <h2 class="text-3xl text-center md:text-5xl font-normal text-white mb-5 md:mb-10 leading-tight">
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
        <div v-if="sw_option.is_popular" class="flex items-top gap-2 absolute top-5 right-5 bg-orange-500/10 border border-orange-500 text-orange-500 text-base sm:text-xl font-normal px-3 py-1 rounded-xl z-10">
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 23.5C12.4182 23.5 16 19.9078 16 15.4767C16 14.5509 15.7543 13.6616 15.4667 12.834C13.6889 14.5958 12.3378 15.4767 11.4133 15.4767C15.6751 7.98837 13.3333 4.77907 6.93333 0.5C7.46667 5.84831 3.95097 8.28122 2.51924 9.63218C0.968384 11.0955 0 13.1727 0 15.4767C0 19.9078 3.58172 23.5 8 23.5ZM8.75669 4.49556C12.2145 7.43774 12.231 9.72386 9.56053 14.4162C8.7488 15.8425 9.77579 17.6163 11.4133 17.6163C12.1476 17.6163 12.8897 17.4015 13.6735 16.9799C13.0111 19.5012 10.722 21.3605 8 21.3605C4.75993 21.3605 2.13333 18.7263 2.13333 15.4767C2.13333 13.8302 2.80831 12.297 3.98107 11.1904C4.11548 11.0636 4.79732 10.4575 4.82642 10.4313C5.27853 10.0232 5.65099 9.66395 6.01909 9.26864C7.33152 7.85927 8.27424 6.29419 8.75669 4.49556Z" fill="#FF6B00" />
          </svg>
          <span>Most popular</span>
        </div>
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
