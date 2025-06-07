<script setup lang="ts">
// import type { FormatMoneyOptions } from '@/shared/lib/money';

import type { OptionBase } from '../model/types';

// import { Price } from '@/entities/price';
import { sum } from 'lodash-es';

import { computed } from 'vue';
import { useOptionsStore } from '../model/OptionsStore';

export interface CartTotalOption extends OptionBase {
  type: 'cart_total';
}

const optionsStore = useOptionsStore();

// const formatMoneyOptions: Partial<FormatMoneyOptions> = {
//   appendCurrencyCode: false,
// };

const cartItemsNumber = computed(() => {
  return optionsStore.mainProduct.quantity + sum(optionsStore.addonsToAddToCart.map(variant => variant.quantity));
});
</script>

<template>
  <div class="cart-total">
    <div
      v-if="optionsStore.cartTotal.compare_at_price > optionsStore.cartTotal.price"
      class="cart-total__block cart-total__block--compare-at-price"
    >
      <span>Total</span>
      <!-- <Price
        :compare-at-price="optionsStore.cartTotal.compare_at_price"
        prepend-currency-code
        :format-money-options="formatMoneyOptions"
      /> -->
    </div>
    <div class="cart-total__block cart-total__block--final-price">
      <span>Total ({{ cartItemsNumber }} item{{ cartItemsNumber > 1 ? 's' : '' }})</span>909909
      <!-- <Price
        :price="optionsStore.cartTotal.price"
        prepend-currency-code
        :format-money-options="formatMoneyOptions"
        class="cart-total__final-price"
      /> -->
    </div>
    <div class="cart-total__message">
      Taxes and all expenses are included.
    </div>
  </div>
</template>

<style scoped lang="scss">
// @use '@artlogo-design/vars';

.cart-total {
  font-size: 1.5rem;
  line-height: 1.5;
  margin-left: auto;
  margin-right: auto;

  > * + * {
    margin-top: 0.5em;
  }

  &__block {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;

    > * + * {
      margin-left: 0.5em;
    }

    &--compare-at-price {
      font-size: 0.8em;
    }

    &--final-price {
      font-weight: bold;
    }
  }

  &__final-price {
    flex-grow: 1;
    justify-content: flex-end;
  }

  &__message {
    font-size: 0.75em;
    color: #919191;
  }

  // @media (min-width: vars.$media-m-min) {
  //   font-size: 2rem;
  //   max-width: 45rem;
  // }
}
</style>
