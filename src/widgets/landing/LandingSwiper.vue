<script setup lang="ts">
import { SWIPER_SLIDES } from '@/shared/config/landing';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Swiper configuration
const modules = [Navigation, Pagination, Autoplay];
</script>

<template>
  <div class="max-w-fit  mx-auto space-y-5 lg:space-y-16">
    <div class="text-center space-y-5 lg:space-y-10 px-3 max-w-[1680px] mx-auto ">
      <h2 class="text-3xl lg:text-5xl font-normal text-white  leading-tight hidden md:block">
        Multipurpose Artlogo Signature that represents you
      </h2>
      <h2 class="text-3xl lg:text-5xl font-normal text-white  leading-tight block md:hidden">
        Your <span class="font-bold">Artlogo</span> Signature – More Than Just a Logo
      </h2>
      <p class="text-gray-300 text-base lg:text-2xl  mx-auto leading-relaxed hidden md:block">
        What's one of the first things clients see of you before they even speak to you? Your Logo. Your logo is that one thing people notice about you
      </p>
      <p class="text-gray-300 text-base lg:text-2xl  mx-auto leading-relaxed block md:hidden">
        It's the first impression you make—before you even say a word. A powerful logo instantly tells clients who you are and what you stand for
      </p>
    </div>

    <!-- Swiper Slider -->
    <div class="relative">
      <Swiper
        :modules="modules"
        :slides-per-view="1.1"
        :space-between="12"
        :centered-slides="false"
        :slides-offset-before="12"
        :slides-offset-after="12"
        :navigation="{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }"
        :breakpoints="{
          640: {
            slidesPerView: 1.2,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 1.4,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 1.6,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 2.2,
            spaceBetween: 30,
          },
        }"
        class="use-cases-swiper [&_.swiper-button-next]:!hidden [&_.swiper-button-prev]:!hidden [&_.swiper-wrapper]:!flex [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto [&_.swiper-slide]:!flex [&_.swiper-slide]:!items-stretch [&_.swiper-slide]:!pb-[5px]"
      >
        <SwiperSlide v-for="useCase in SWIPER_SLIDES" :key="useCase.id">
          <div class="bg-white/20 rounded-xl sm:rounded-[36px] p-3 overflow-hidden border border-white w-full flex flex-col">
            <div class="flex h-full space-x-4 md:space-x-10">
              <!-- Image section -->
              <div class="w-2/5 relative">
                <div class="h-full relative">
                  <img
                    :src="useCase.image"
                    :alt="useCase.title"
                    class="w-full h-auto sm:h-full"
                    loading="lazy"
                  >
                </div>
              </div>

              <!-- Content section -->
              <div class="w-3/5 pt-0 md:pt-4 flex flex-col justify-start">
                <h3 class="text-base md:text-3xl font-bold text-white mb-2 leading-tight">
                  {{ useCase.title }}
                </h3>
                <p class="text-white/50 text-sm md:text-xl font-normal lg:font-semibold leading-relaxed">
                  {{ useCase.description }}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Custom Navigation Buttons -->
      <div class="flex justify-center items-center mt-8 space-x-4">
        <button
          class="custom-prev w-10 h-10 bg-transparent hover:bg-white border-4 border-white rounded-full flex items-center justify-center transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <svg height="24px" class="text-white mr-[2px] rotate-180 group-hover:text-orange-400 transition-colors duration-300" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="currentColor" d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z" /></svg>
        </button>
        <button
          class="custom-next w-10 h-10 bg-transparent hover:bg-white border-4 border-white rounded-full flex items-center justify-center transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          aria-label="Next slide"
        >
          <svg height="24px" class="text-white ml-[2px] group-hover:text-orange-400 transition-colors duration-300" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="currentColor" d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z" /></svg>
        </button>
      </div>
    </div>
  </div>
</template>
