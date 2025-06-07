<script setup lang="ts">
import { LANDING_REVIEWS } from '@/shared/config/landing';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = [Navigation, Pagination, Autoplay];
</script>

<template>
  <section class="max-w-[1680px] mx-auto px-3">
    <div class="text-center space-y-10  mb-10 md:mb-16">
      <h2 class="text-3xl md:text-5xl font-normal text-white">
        3000+ Reviews by our Clients
      </h2>

      <!-- Review Sources and Rating in one line -->
      <div class="flex flex-col lg:flex-row justify-center items-center !mt-5 sm:!mt-10 gap-8">
        <!-- Review Sources -->
        <div class="flex flex-col justify-center items-center gap-2">
          <div class="flex items-center">
            <span class="text-white/60 mr-2">See our 1100+ Reviews on</span>
            <svg class="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#00B67A" />
            </svg>
            <a href="https://www.trustpilot.com/review/artlogo.co" class="text-white font-normal ml-1">Trustpilot</a>
          </div>
          <div class="flex items-center">
            <span class="text-white/60 mr-2">Our 1600+ Reviews on</span>
            <svg class="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#facc15" />
            </svg>
            <a href="https://artlogo.co/pages/reviews" class="text-white font-normal ml-1">Artlogo</a>
          </div>
        </div>

        <!-- Rating -->
        <div class="flex items-center justify-center">
          <img src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/stars.webp?v=1749048942" alt="stars" class="w-auto h-8 sm:h-12 mr-4">
          <div class="flex flex-col items-center justify-center text-center">
            <span class="text-4xl font-bold text-green-400">4.8</span>
            <span class="text-white/60 text-sm ml-2">(Excellent)</span>
          </div>
        </div>
      </div>

      <p class="text-gray-300 text-base md:text-2xl font-normal mx-auto leading-relaxed">
        Every person signs a large number of documents, send thousands of emails or active in social media during their lifetime. Artlogo's mission is to create your eye-catching signature that makes You and Your name unique and helps you stand out.
      </p>
    </div>

    <!-- Reviews Slider -->
    <div class="relative mb-16 max-w-5xl mx-auto">
      <Swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="32"
        :navigation="{
          nextEl: '.review-next',
          prevEl: '.review-prev',
        }"
        :loop="true"
        :auto-height="true"
        class="reviews-swiper [&_.swiper-button-next]:!hidden [&_.swiper-button-prev]:!hidden"
      >
        <SwiperSlide v-for="review in LANDING_REVIEWS" :key="review.id">
          <div class="flex flex-col sm:flex-row gap-8 items-start justify-start">
            <div class="relative w-full sm:w-1/2 flex-shrink-0">
              <div class="relative z-10 flex items-center justify-center">
                <img
                  :src="review.image"
                  :alt="review.name"
                  class="w-full h-auto object-cover rounded-xl shadow-lg"
                >
              </div>
            </div>

            <div class="bg-white rounded-2xl p-7 text-black flex flex-col w-full sm:w-1/2">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span class="text-green-600 font-bold text-lg">{{ review.name.charAt(0) }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-lg truncate">
                    {{ review.name }}
                  </h4>
                  <div class="flex items-center">
                    <div class="flex text-green-500 text-sm mr-2">
                      ★★★★★
                    </div>
                    <span class="text-gray-500 text-sm">{{ review.date }}</span>
                  </div>
                </div>
              </div>

              <h3 class="text-xl font-bold mb-2 text-green-600">
                Perfection!
              </h3>

              <div class="text-gray-700 text-sm leading-tight space-y-1">
                <p v-for="(paragraph, index) in review.text.split('\n\n')" :key="index">
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Custom navigation buttons -->
      <div class="flex justify-center items-center mt-6 sm:mt-8 space-x-4">
        <button
          class="review-prev w-10 h-10 bg-transparent hover:bg-white border-4 border-white rounded-full flex items-center justify-center transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <svg height="24px" class="text-white mr-[2px] rotate-180 group-hover:text-orange-400 transition-colors duration-300" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="currentColor" d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z" /></svg>
        </button>
        <button
          class="review-next w-10 h-10 bg-transparent hover:bg-white border-4 border-white rounded-full flex items-center justify-center transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          aria-label="Next slide"
        >
          <svg height="24px" class="text-white ml-[2px] group-hover:text-orange-400 transition-colors duration-300" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="currentColor" d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z" /></svg>
        </button>
      </div>
    </div>
  </section>
</template>
