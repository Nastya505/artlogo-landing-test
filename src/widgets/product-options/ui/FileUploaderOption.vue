<script setup lang="ts">
import type { Swiper as SwiperType } from 'swiper';

import type { OptionBase } from '../model/types';
import { FileUploader } from '@artlogo-co/ui-kit';
import { useMediaQuery } from '@vueuse/core';
import { ElButton } from 'element-plus';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { ref, watch } from 'vue';
import { useOptionsStore } from '../model/OptionsStore';

export interface FileUploaderOption extends OptionBase {
  type: 'file_uploader';
  label: string;
  accept: string;
}
const props = defineProps<{ option: FileUploaderOption }>();
const isDesktop = useMediaQuery('(min-width: 768px)');
const swiperRef = ref<SwiperType | null>(null);

const optionsStore = useOptionsStore();

const isSliderVisible = ref(false);

function toggleSlider() {
  isSliderVisible.value = !isSliderVisible.value;
}
watch(isDesktop, (value) => {
  if (value && swiperRef.value) {
    swiperRef.value.slideTo(1);
  }
});

const IMAGES = [
  'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/image-181.webp?v=1738084529',
  'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/Fernanda_Diaz.webp?v=1739367652',
  'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/image-2727.webp?v=1739376277',
];
</script>

<template>
  <div>
    <ElButton
      style="color:#092E7F;font-size: 24px; font-family: Lato; font-weight: 700; border-bottom: 3px solid #092E7F; border-radius: 0; "
      class="mb-7"
      link
      @click="toggleSlider"
    >
      {{ isSliderVisible ? 'Hide examples' : 'Show examples' }}
    </ElButton>

    <div v-if="isSliderVisible">
      <Swiper
        :allow-touch-move="isDesktop ? false : true"
        centered-slides
        :slides-per-view="isDesktop ? 3 : 1"
        :initial-slide="1"
        space-between="20"
        :modules="[Pagination]"
        :pagination="!isDesktop ? { clickable: true, el: '.carousel-pagination' } : false"
        @swiper="swiperRef = $event"
      >
        <SwiperSlide v-for="(image, index) in IMAGES" :key="index" class="flex justify-center items-center w-full !h-60 md:!h-96">
          <img
            :src="image"
            :alt="`Image ${index}`"
            class="w-full h-full rounded-xl object-scale-down"
          >
        </SwiperSlide>
      </Swiper>

      <div
        v-if="!isDesktop"
        class="carousel-pagination mt-2 mb-7 mx-auto !translate-x-0"
      />
    </div>

    <!-- FileUploader Section -->
    <div class="w-full" :class="isSliderVisible ? 'mt-8 md:mt-24' : ' mt-0'">
      <div v-if="optionsStore.mainProduct.customParams[props.option.cart_label]" class="flex items-center w-full justify-center">
        <img
          :src="optionsStore.mainProduct.customParams[props.option.cart_label]"
          alt="Uploaded Image"
          class="max-w-full max-h-96 object-cover mb-5 md:mb-0 rounded-lg"
        >
      </div>
      <div class="fileuploader__wrapper">
        <FileUploader
          v-model="(optionsStore.mainProduct.customParams[props.option.cart_label] as string)"
          :labels="{ main: 'Choose file to upload' }"
          :accept="option.accept"
          :display-mode="isDesktop ? 'advanced' : 'default'"
          image-editor
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fileuploader__wrapper {
  :deep(.art-fileuploader__wrapper) {
    background-color: #f15971;
    border: none;
    color: #fff;
    text-decoration: none;
    max-width: 288px;
    margin: 0 auto;
    height: 54px;
  }
  :deep(.art-fileuploader__label--active) {
    text-decoration: none;
    font-weight: 700;
    font-size: 18px;
  }
  :deep(.art-fileuploader-advanced__preview-actions) {
    align-items: stretch;
  }
}
.carousel-pagination {
  :deep(.swiper-pagination-bullet) {
    background-color: #000;
  }
}
</style>
