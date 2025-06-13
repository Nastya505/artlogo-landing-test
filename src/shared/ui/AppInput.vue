<script setup lang="ts">
interface Props {
  label: string;
  placeholder: string;
  modelValue: string;
  required?: boolean;
  textAlign?: 'left' | 'center' | 'right';
}

defineProps<Props>();
defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <div class="w-full">
    <label class="block text-white font-medium mb-3 text-xl md:text-3xl" :class="{ 'text-left': textAlign === 'left', 'text-center': textAlign === 'center', 'text-right': textAlign === 'right' }">
      {{ label }}
    </label>
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      :required="required"
      class="w-full p-5 bg-white/20 border border-white rounded-lg text-white placeholder-white/50 focus:border-blue-600 focus:outline-none text-base md:text-lg transition-colors duration-300"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>
