<script setup lang="ts">
import {
  LandingFooter,
  LandingNavigation,
  ProgressSteps,
} from '@/widgets/landing';
import ArtlogoProductOptions from '@/widgets/product-options/ArtlogoProductOptions.vue';
import { ElSkeleton, ElSkeletonItem } from 'element-plus';

import { ref } from 'vue';

const isLoading = ref(true);

function handleInitialized() {
  isLoading.value = false;
}
</script>

<template>
  <div class="bg-[#000105] font-montserrat overflow-x-hidden">
    <LandingNavigation />
    <ProgressSteps class="my-20 md:mt-24" />
    <ElSkeleton v-if="isLoading" animated :count="1">
      <template #template>
        <div class="space-y-6 max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <ElSkeletonItem variant="rect" class="h-96 !w-1/2 mx-auto mb-4" />
          <ElSkeletonItem variant="rect" class="h-4 w-full mx-auto mb-4" />
          <div class="flex flex-col lg:flex-row gap-5 justify-between items-center w-full">
            <ElSkeletonItem variant="rect" class="!h-96 w-1/3" />
            <ElSkeletonItem variant="rect" class="!h-96 w-1/3" />
            <ElSkeletonItem variant="rect" class="!h-96 w-1/3" />
          </div>
          <ElSkeletonItem variant="rect" class="!h-16 w-full lg:!w-1/2 mx-auto !mt-20 mb-10" />
          <ElSkeletonItem variant="rect" class="!h-16 w-full lg:!w-1/2 mx-auto !mb-12" />
          <div class="flex flex-col lg:flex-row gap-5 justify-center items-center w-full flex-wrap">
            <ElSkeletonItem variant="rect" class="!h-96 w-full lg:!w-[30%]" />
            <ElSkeletonItem variant="rect" class="!h-96 w-full lg:!w-[30%]" />
            <ElSkeletonItem variant="rect" class="!h-96 w-full lg:!w-[30%]" />
            <ElSkeletonItem variant="rect" class="!h-96 w-full lg:!w-[30%]" />
            <ElSkeletonItem variant="rect" class="!h-96 w-full lg:!w-[30%]" />
            <ElSkeletonItem variant="rect" class="!h-96 w-full lg:!w-[30%]" />
            <ElSkeletonItem variant="rect" class="!h-96 w-full lg:!w-[30%]" />
            <ElSkeletonItem variant="rect" class="!h-96 w-full lg:!w-[30%]" />
            <ElSkeletonItem variant="rect" class="!h-96 w-full lg:!w-[30%]" />
            <ElSkeletonItem variant="rect" class="!h-96 w-full lg:!w-[30%]" />
            <ElSkeletonItem variant="rect" class="!h-96 w-full lg:!w-[30%]" />
            <ElSkeletonItem variant="rect" class="!h-96 w-full lg:!w-[30%]" />
          </div>
        </div>
      </template>
    </ElSkeleton>
    <ArtlogoProductOptions
      product-handle="signature-logo"
      currency="USD"
      :is-loading="isLoading"
      @initialized="handleInitialized"
    />
    <LandingFooter
      :is-show-subscribe="false"
      :is-show-payment-methods="false"
    />
  </div>
</template>
