<script setup lang="ts">
import type { OptionBase } from '../model/types';
import { sum } from 'lodash-es';
import { computed } from 'vue';
import { useOptionsStore } from '../model/OptionsStore';

export interface CartTotalOption extends OptionBase {
  type: 'cart_total';
}

const optionsStore = useOptionsStore();

const cartItemsNumber = computed(() => {
  return optionsStore.mainProduct.quantity + sum(optionsStore.addonsToAddToCart.map(variant => variant.quantity));
});
</script>

<template>
  <section>
    <div class="flex justify-between flex-wrap items-start font-bold mb-2 border-t-2  border-white border-solid text-white pt-10 lg:pt-16">
      <span class="flex items-center text-white text-2xl lg:text-4xl font-normal">
        <b class="mr-2">Total</b>({{ cartItemsNumber }} item{{ cartItemsNumber > 1 ? 's' : '' }})</span>
      <div class="flex items-center justify-end flex-col gap-2">
        <div v-if="optionsStore.cartTotal.compare_at_price > optionsStore.cartTotal.price" class="flex font-semibold  items-center text-gray-400">
          <span class="mr-2 text-sm lg:text-base">USD</span>
          <span class="line-through text-base lg:text-2xl">${{ (optionsStore.cartTotal.compare_at_price / 100).toFixed(2) }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-white mr-2 text-base font-bold">USD</span>
          <span class="text-white text-2xl lg:text-4xl font-semibold">${{ (optionsStore.cartTotal.price / 100).toFixed(2) }}</span>
        </div>
      </div>
    </div>
    <div class="text-base lg:text-2xl text-[#919191]">
      Tax and all costs included. Shipping via email
    </div>
  </section>
</template>
