<script setup lang="ts">
import type { Swiper as SwiperType } from 'swiper';
import { useMediaQuery } from '@vueuse/core';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref } from 'vue';
import 'swiper/css';
import 'swiper/css/pagination';

const isDesktop = useMediaQuery('(min-width: 1023px)');

const plans = [
  {
    name: 'Basic',
    price: 39,
    originalPrice: 59.95,
    title: 'Standard Calligrapher',
    concepts: '1x',
    revisions: '2 revisions rounds',
    delivery: 'Standard delivery time (5-7 days)',
    format: 'Digital files (PNG)',
    description: 'Great first step to establish your professional identity',
    features: [
      '1x unique signature logo concept',
      '2 revisions rounds',
      'Standard delivery time (5-7 days)',
      'Digital files (PNG)',
    ],
  },
  {
    name: 'Most Popular',
    price: 59,
    originalPrice: 89.95,
    title: 'Top Level Calligrapher',
    concepts: '3x',
    revisions: '5 revision rounds',
    delivery: 'Faster delivery (3-5 days)',
    format: 'Priority customer support',
    extraFeature: '1 free minor change within 30 days',
    recommendation: 'Recommended by 78% of our clients for optimal quality/price balance',
    isPopular: true,
    features: [
      '3x unique signature logo concepts',
      '5 revision rounds',
      'Faster delivery (3-5 days)',
      'Priority customer support',
      '1 free minor change within 30 days',
    ],
  },
  {
    name: 'Premium',
    price: 79,
    originalPrice: 109.95,
    title: 'Head Calligrapher',
    concepts: '5x',
    revisions: 'Unlimited revisions',
    delivery: 'Express delivery (24-48 hours)',
    format: 'Dedicated account manager',
    extraFeature: '3 free changes within 60 days',
    extraFeature2: 'Priority customer support',
    description: 'For those who demand perfection and premium service',
    features: [
      '5x unique signature logo concepts',
      'Unlimited revisions',
      'Express delivery (24-48 hours)',
      'Dedicated account manager',
      '3 free changes within 60 days',
      'Priority customer support',
    ],
  },
];

const swiperRef = ref<SwiperType | null>(null);
</script>

<template>
  <section id="pricing" class="max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-5xl font-normal text-white mb-5 md:mb-10 leading-tight">
        Create Your Signature Logo
      </h2>
      <p class="text-gray-300 text-base md:text-2xl mx-auto leading-relaxed max-w-4xl">
        Make your unique signature, signature logo and watermark. Sign your documents, brand your content and name with the unique logo handwritten by a professional calligrapher
      </p>
    </div>

    <Swiper
      :modules="[Pagination]"
      :allow-touch-move="!isDesktop"
      :pagination="!isDesktop && { clickable: true }"
      :space-between="24"
      :initial-slide="1"
      centered-slides
      :breakpoints="{
        320: { slidesPerView: 1.1 },
        768: { slidesPerView: 1.1 },
        1024: { slidesPerView: 3 },
      }"
      class="pricing-swiper !pb-16 lg:!pb-0"
      @swiper="swiperRef = $event"
    >
      <SwiperSlide
        v-for="plan in plans"
        :key="plan.name"
        class="h-auto"
      >
        <div
          class="transition-all duration-300 relative border-2 border-white rounded-3xl bg-transparent p-8 h-full flex flex-col justify-between text-left items-start hover:border-blue-500 hover:bg-blue/5 active:border-blue-500 active:border-[5px] active:bg-blue/5"
        >
          <!-- Best Value Badge -->
          <div
            v-if="plan.isPopular"
            class="flex items-end w-full justify-end"
          >
            <span class="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Best Value
            </span>
          </div>
          <div
            v-if="!plan.isPopular"
            class="h-6"
          />
          <!-- Header -->
          <div class="text-left mb-8">
            <h3 class="text-2xl font-bold text-white mb-2">
              {{ plan.name }}
            </h3>
            <div class="mb-4">
              <span class="text-5xl font-bold text-white">${{ plan.price }}</span>
              <span class="text-gray-400 text-lg ml-2 line-through">${{ plan.originalPrice }}</span>
            </div>
            <h4 class="text-xl font-semibold text-white">
              {{ plan.title }}
            </h4>
          </div>

          <!-- Features -->
          <div class="flex-1 space-y-4 mb-8">
            <div class="flex items-center text-white">
              <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              <span class="text-lg">{{ plan.concepts }} {{ plan.concepts === '1x' ? 'unique signature logo concept' : 'unique signature logo concepts' }}</span>
            </div>

            <div class="flex items-center text-white">
              <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              <span class="text-lg">{{ plan.revisions }}</span>
            </div>

            <div class="flex items-center text-white">
              <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              <span class="text-lg">{{ plan.delivery }}</span>
            </div>

            <div class="flex items-center text-white">
              <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              <span class="text-lg">{{ plan.format }}</span>
            </div>

            <div v-if="plan.extraFeature" class="flex items-center text-white">
              <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              <span class="text-lg">{{ plan.extraFeature }}</span>
            </div>

            <div v-if="plan.extraFeature2" class="flex items-center text-white">
              <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              <span class="text-lg">{{ plan.extraFeature2 }}</span>
            </div>
          </div>

          <!-- Recommendation or Description -->
          <div v-if="plan.recommendation" class="text-left">
            <p class="text-sm text-gray-400 italic">
              {{ plan.recommendation }}
            </p>
          </div>

          <div v-else-if="plan.description" class="text-left ">
            <p class="text-sm text-gray-400">
              {{ plan.description }}
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped>
:deep(.pricing-swiper) {
  .swiper-pagination-bullet {
    background: white;
    opacity: 0.4;
    width: 62px;
    border-radius: 10px;
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
  }
  .swiper-slide {
    height: auto;
  }
  .swiper-wrapper {
    align-items: stretch !important;
  }
}
</style>
