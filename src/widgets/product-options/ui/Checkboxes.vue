<script setup lang="ts">
import type { OptionBase } from '../model/types';
import { useOptionsStore } from '../model/OptionsStore';

export interface CheckboxesOption extends OptionBase {
  type: 'checkboxes';
  options: string[];
  min_selections: number | null;
  max_selections: number | null;
}

defineProps<{ option: CheckboxesOption }>();

const optionsStore = useOptionsStore();

function onChange(checkboxOption: CheckboxesOption, checkboxValue: string, isChecked: boolean) {
  if (checkboxOption.max_selections === 1) {
    optionsStore.mainProduct.customParams[checkboxOption.cart_label] = checkboxValue;
  } else {
    let currentValue = (optionsStore.mainProduct.customParams[checkboxOption.cart_label] || '')
      .split(/,\s*/g)
      .filter(value => value);

    currentValue = currentValue.filter(value => checkboxOption.options.includes(value));

    if (currentValue.length === checkboxOption.max_selections && isChecked) {
      return;
    }

    if (currentValue.includes(checkboxValue)) {
      currentValue = currentValue.filter(value => value !== checkboxValue);
    }

    if (isChecked) {
      currentValue.push(checkboxValue);
    }

    optionsStore.mainProduct.customParams[checkboxOption.cart_label] = currentValue.join(', ');
  }
}
</script>

<template>
  <div class="product-option__checkboxes">
    <label
      v-for="value in option.options"
      :key="value"
      class="product-option__checkboxes-option-label"
      :class="{
        'product-option__checkboxes-option-label--checked':
          optionsStore.mainProduct.customParams[option.cart_label]?.includes(value),
      }"
    >
      <input
        v-if="option.max_selections === null || option.max_selections > 1"
        type="checkbox"
        class="product-option__checkboxes-option-input"
        @change="onChange(option, value, ($event.target as HTMLInputElement).checked)"
      >
      <input
        v-else
        v-model="optionsStore.mainProduct.customParams[option.cart_label]"
        type="radio"
        class="product-option__checkboxes-option-input"
        :value="value"
      >
      <span v-html="value" />
    </label>
  </div>
</template>

<style scoped lang="scss">
.product-option {
  &__checkboxes {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: -0.5em 0 0 -1em;

    > * {
      margin: 0.5em 0 0 1em;
    }
  }

  &__checkboxes-option-label {
    display: block;
    padding: 1em;
    background-color: #f6f6f6;
    border-radius: 1em;
    font-size: 1em;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;

    input {
      display: none;
    }

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border: 3px solid #000;
      border-radius: 1em;
      opacity: 0;
      transition: all 0.3s;
    }

    &--checked {
      background-color: transparent;

      &::before {
        opacity: 1;
      }
    }
  }
}
</style>
