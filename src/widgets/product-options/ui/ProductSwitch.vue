<script setup lang="ts">
import type { OptionBase } from '../model/types';
import { ElPopover, ElSwitch } from 'element-plus';

// import { Price } from '@/entities/price';

import { useOptionsStore } from '../model/OptionsStore';

export interface ProductSwitchOption extends OptionBase {
  type: 'product_switch';
  product_variant_id: number;
  product_title: string;
  product_description: string;
  product_image: string;
  product_price: number;
  product_compare_at_price: number;
  active_by_default: boolean;
}

defineProps<{ option: ProductSwitchOption }>();

const optionsStore = useOptionsStore();
</script>

<template>
  <div
    class="product-addon"
    :style="option.show_background_color ? { backgroundColor: option.background_color } : {}"
  >
    <img :src="option.product_image" alt="" class="product-addon__image" width="160" height="160">
    <h6 class="product-addon__title">
      {{ option.product_title }}
    </h6>
    <!-- <Price
      :price="option.product_price"
      :compare-at-price="option.product_compare_at_price"
      :format-money-options="{ appendCurrencyCode: false }"
      mode="vertical"
      class="product-addon__price"
    /> -->

    <div class="product-addon__description-wrapper">
      <template v-if="option.product_description">
        <div
          class="rte product-addon__description product-addon__description--desktop"
          v-html="option.product_description"
        />
        <div>
          <ElPopover trigger="click" effect="dark" popper-style="min-width: 200px;">
            <template #reference>
              <button class="vuc-link-button vuc-link-button--underline-always product-addon__more-info-button">
                More Info
              </button>
            </template>
            <div
              class="rte product-addon__description product-addon__description--in-popper"
              v-html="option.product_description"
            />
          </ElPopover>
        </div>
      </template>
    </div>

    <ElSwitch
      v-model="optionsStore.mainProduct.customParams[option.cart_label]"
      class="product-addon__switch"
      active-value="true"
      inactive-value="false"
      style="--el-switch-on-color: #76d472; --el-switch-off-color: #d9dadc"
    />
  </div>
</template>

<style scoped lang="scss">
// @use '@artlogo-design/vars';
//
.product-addon {
  display: grid;
  grid-template-columns: 20% 1fr auto;
  grid-template-rows: auto 1fr;
  font-size: 1rem;
  row-gap: 0.5em;
  column-gap: 0.5em;
  padding: 0.625em 0.5em;

  & + & {
    margin-top: 0;
  }

  &__image {
    width: 100%;
    grid-row-start: span 2;
  }

  &__title {
    font-size: 1.125em;
    margin: 0;
    height: fit-content;
  }

  &__price {
    text-align: center;
    font-size: 1.125em;
  }

  &__more-info-button {
    width: fit-content;
    color: vars.$color--link-blue;
  }

  &__description {
    &--in-popper {
      text-align: center;
      font-size: 1rem;
    }

    &--desktop {
      display: none;
    }
  }

  &__switch {
    height: fit-content;
    font-size: 0.8em;

    :deep(.el-switch__core) {
      width: 5em;
      height: 3em;
      border-radius: 3em;
    }

    :deep(.el-switch__action) {
      left: 0.4em;
      width: 2.2em;
      height: 2.2em;
    }

    &.is-checked :deep(.el-switch__core .el-switch__action) {
      left: calc(100% - 2.6em);
    }
  }

  // @media (min-width: vars.$media-m-min) {
  //   grid-template-columns: 130px 1fr auto auto;
  //   column-gap: 1em;
  //   padding: 1.25em 0.5em;

  //   &__title {
  //     font-size: 1.3em;
  //   }

  //   &__description-wrapper {
  //     grid-column-start: 2;
  //     grid-row-start: 2;
  //   }

  //   &__description {
  //     &--desktop {
  //       display: block;
  //     }
  //   }

  //   &__more-info-button {
  //     display: none;
  //   }

  //   &__price {
  //     font-size: 1em;
  //   }

  //   &__switch {
  //     font-size: 0.7em;
  //   }

  //   &__price,
  //   &__switch {
  //     grid-row-start: span 2;
  //   }
  // }

  // @media (min-width: vars.$media-l-min) {
  //   font-size: 1.3rem;
  // }
}
</style>
