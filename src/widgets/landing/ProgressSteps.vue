<script setup lang="ts">
import { ORDER_STEPS } from '@/shared/config/landing';

withDefaults(defineProps<Props>(), {
  currentStep: 1,
  steps: () => ORDER_STEPS,
});

interface Step {
  id: number;
  title: string;
}

interface Props {
  steps?: Step[];
  currentStep?: number;
}
</script>

<template>
  <div class="bg-black max-w-[1680px] w-full mx-auto py-4 p px-3 sm:px-6 lg:px-8">
    <div class="flex items-center justify-center flex-wrap gap-2 md:gap-12">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        class="flex items-center md:w-auto"
        :class="{
          'w-full justify-center': index === steps.length - 1 && steps.length === 3,
        }"
      >
        <div class="flex items-center">
          <div
            class="flex-shrink-0 border border-white border-solid rounded-full flex items-center justify-center mr-2 md:mr-4 w-5 h-5 md:w-12 md:h-12 md:border-4"
          >
            <span class="font-bold text-white text-xs md:text-2xl">{{ step.id }}</span>
          </div>
          <span class="font-semibold text-white text-sm sm:text-xl lg:text-2xl whitespace-nowrap">
            {{ step.title }}
          </span>
        </div>

        <div
          v-if="index < steps.length - 1"
          class="ml-2 md:ml-12"
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/double-arrow.svg?v=1749202464"
            alt="Arrow"
            class="w-3 md:w-12 h-auto"
          >
        </div>
      </div>
    </div>

    <div class="h-[6px] rounded-full md:rounded-none bg-blue-600 mt-4" />
  </div>
</template>
