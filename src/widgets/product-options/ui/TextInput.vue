<script setup lang="ts">
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'vue';
import type { OptionBase, validationSchemas } from '../model/types';
import { computed } from 'vue';

import { useOptionsStore } from '../model/OptionsStore';

export interface TextInputOption extends OptionBase {
  type: 'text_input';
  placeholder_text: string;
  character_limit: number | null;
  validation_type: '' | keyof typeof validationSchemas;
}
export interface LargeTextInputOption extends OptionBase {
  type: 'large_text_input';
  placeholder_text: string;
  character_limit: number | null;
}

const props = defineProps<{
  option: LargeTextInputOption | TextInputOption;
}>();
const optionsStore = useOptionsStore();

function onTextInput(event: Event) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;

  if (props.option.character_limit) {
    if (target.value.length > props.option.character_limit) {
      target.value = target.value.slice(0, props.option.character_limit);
    }
  }

  const key = props.option.cart_label;
  optionsStore.mainProduct.customParams[key] = target.value;
}

const inputAttrs = computed<InputHTMLAttributes | TextareaHTMLAttributes | undefined>(() => {
  if (props.option.type === 'text_input') {
    switch (props.option.validation_type) {
      case 'email':
        return { type: 'email', name: 'email' };
      default:
        return { type: 'text' };
    }
  }

  return undefined;
});
</script>

<template>
  <div class="w-full">
    <component
      :is="option.type === 'text_input' ? 'input' : 'textarea'"
      v-model="optionsStore.mainProduct.customParams[option.cart_label]"
      :value="optionsStore.mainProduct.customParams[option.cart_label] === 'undefined' ? '' : optionsStore.mainProduct.customParams[option.cart_label]"
      :placeholder="option.placeholder_text"
      class="w-full p-5 bg-white/20 border border-white rounded-lg text-white placeholder-white/50 focus:border-blue-500 focus:outline-none text-base md:text-lg transition-colors duration-300" :class="[
        {
          'resize-none overflow-y-auto min-h-72 text-base lg:!text-3xl': option.type === 'large_text_input',
        },
      ]"
      v-bind="inputAttrs"
      @blur="optionsStore.validateOption(option)"
      @input="onTextInput"
    />
  </div>
</template>
