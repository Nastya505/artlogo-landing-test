<script setup lang="ts">
import type { OptionBase } from '../model/types';
import { ElPopover, ElSwitch } from 'element-plus';
import { useOptionsStore } from '../model/OptionsStore';

export interface ProductSwitchOption extends OptionBase {
  type: 'product_switch';
  product_variant_id?: number;
  product_label: string;
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
  <section class="gap-8 flex justify-between items-center mt-10">
    <div
      class="flex items-start gap-4 md:gap-10 text-white shadow-lg"
    >
      <img :src="option.product_image" alt="addon-image" class="w-20 sm:w-32 h-20 sm:h-32 object-cover rounded-xl bg-white flex-shrink-0 mx-auto md:mx-0">
      <div class="flex-1 max-w-full md:max-w-5xl">
        <div class="text-base w-full lg:text-3xl text-white font-bold mb-1 leading-snug">
          {{ option.product_label }}
        </div>
        <div class=" hidden sm:block text-base lg:text-2xl text-white font-normal leading-snug">
          {{ option.product_description }}
        </div>
        <div class="sm:hidden block">
          <ElPopover trigger="click" effect="dark" popper-style="min-width: 200px;">
            <template #reference>
              <button
                type="button"
                class="bg-transparent border-none text-blue-500 text-sm font-normal underline underline-offset-4 decoration-2 transition-colors duration-300 hover:text-blue-200 focus:text-blue-100 p-0 m-0 cursor-pointer"
              >
                More Info
              </button>
            </template>
            <div
              class="rte product-addon__description product-addon__description--in-popper"
              v-html="option.product_description"
            />
          </ElPopover>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row items-center justify-end gap-3 lg:gap-8 md:ml-4 ml-auto">
      <div class="flex flex-col items-center justify-center">
        <div v-if="option.product_compare_at_price && option.product_compare_at_price > option.product_price" class="text-gray-400 text-sm md:text-base lg:text-2xl line-through text-right">
          ${{ (option.product_compare_at_price / 100).toFixed(2) }}
        </div>
        <div class="text-white text-lg md:text-2xl lg:text-4xl font-semibold text-right ">
          +${{ (option.product_price / 100).toFixed(2) }}
        </div>
      </div>
      <ElSwitch
        v-model="optionsStore.mainProduct.customParams[option.cart_label]"
        class="product-switch__switch"
        active-value="true"
        inactive-value="false"
        style="--el-switch-on-color: #76d472; --el-switch-off-color: #d9dadc"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
  .product-switch__switch {
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
</style>
