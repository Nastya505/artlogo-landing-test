<script setup lang="ts">
import type { Swiper as SwiperType } from 'swiper';
import type { OptionBase } from '../model/types';
import { useMediaQuery } from '@vueuse/core';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { nextTick, ref, watch } from 'vue';
import { useOptionsStore } from '../model/OptionsStore';
import 'swiper/css';
import 'swiper/css/pagination';

export interface RadioOption extends OptionBase {
  type: 'radio';
  options: string[];
  add_product_condition: string | null;
  product_variant_id: number | null;
  product_price: number;
  product_compare_at_price: number;
  product_title: string;
}

defineProps<{ option: RadioOption }>();

const optionsStore = useOptionsStore();
const isDesktop = useMediaQuery('(min-width: 1023px)');
const swiperRef = ref<SwiperType | null>(null);

interface PlanDetails {
  name: string;
  price: number;
  originalPrice: number;
  title: string;
  concepts: string;
  revisions: string;
  delivery: string;
  format: string;
  isPopular: boolean;
  description?: string;
  extraFeature?: string;
  extraFeature2?: string;
  recommendation?: string;
}

// Mapping options to pricing plans
function getPlanDetails(optionValue: string): PlanDetails {
  const plans: Record<string, PlanDetails> = {
    'Calligrapher': {
      name: 'Basic',
      price: 3900,
      originalPrice: 5995,
      title: 'Standard Calligrapher',
      concepts: '1x',
      revisions: '2 revisions rounds',
      delivery: 'Standard delivery time (5-7 days)',
      format: 'Digital files (PNG)',
      description: 'Great first step to establish your professional identity',
      isPopular: false,
    },
    'Top Level Calligrapher': {
      name: 'Most Popular',
      price: 5900,
      originalPrice: 8995,
      title: 'Top Level Calligrapher',
      concepts: '3x',
      revisions: '5 revision rounds',
      delivery: 'Faster delivery (3-5 days)',
      format: 'Priority customer support',
      extraFeature: '1 free minor change within 30 days',
      recommendation: 'Recommended by 78% of our clients for optimal quality/price balance',
      isPopular: true,
    },
    'Head Calligrapher': {
      name: 'Premium',
      price: 7900,
      originalPrice: 10995,
      title: 'Head Calligrapher',
      concepts: '5x',
      revisions: 'Unlimited revisions',
      delivery: 'Express delivery (24-48 hours)',
      format: 'Dedicated account manager',
      extraFeature: '3 free changes within 60 days',
      extraFeature2: 'Priority customer support',
      description: 'For those who demand perfection and premium service',
      isPopular: false,
    },
  };

  return plans[optionValue] || {
    name: 'Custom',
    price: 3900,
    originalPrice: 5995,
    title: optionValue,
    concepts: '1x',
    revisions: '2 revisions',
    delivery: 'Standard delivery',
    format: 'Digital files',
    description: 'Custom plan',
    isPopular: false,
  };
}
</script>

<template>
  <section class="">
    <div class="text-center mb-12 max-w-[1680px] mx-auto">
      <h2 class="text-3xl md:text-5xl font-normal text-white mb-5 md:mb-10 leading-tight">
        Create Your Signature Logo
      </h2>
      <p class="text-gray-300 text-base md:text-2xl mx-auto leading-relaxed w-full">
        Make your unique signature logo and watermark. Sign your documents, brand your content and name with the unique logo handwritten by a professional calligrapher
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
        v-for="optionValue in option.options"
        :key="optionValue"
        class="h-auto"
      >
        <label class="block cursor-pointer h-full">
          <input
            v-model="optionsStore.mainProduct.customParams[option.cart_label]"
            :value="optionValue"
            type="radio"
            class="sr-only"
          >

          <div
            class="transition-all duration-300 relative border-2 rounded-3xl bg-transparent p-8 h-full flex flex-col justify-between text-left items-start hover:border-blue-500 hover:bg-blue/5"
            :class="{
              'border-blue-500 bg-blue-500/10': optionsStore.mainProduct.customParams[option.cart_label] === optionValue,
              'border-white': optionsStore.mainProduct.customParams[option.cart_label] !== optionValue,
            }"
          >

            <!-- Best Value Badge -->
            <div
              v-if="getPlanDetails(optionValue).isPopular"
              class="flex items-end w-full justify-end"
            >
              <span class="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Best Value
              </span>
            </div>
            <div
              v-if="!getPlanDetails(optionValue).isPopular"
              class="h-6"
            />

            <!-- Header -->
            <div class="text-left mb-8 w-full">
              <h3 class="text-2xl font-bold text-white mb-2">
                {{ getPlanDetails(optionValue).name }}
              </h3>
              <div class="mb-4">
                <span class="text-5xl font-bold text-white">${{ getPlanDetails(optionValue).price }}</span>
                <span class="text-gray-400 text-lg ml-2 line-through">${{ getPlanDetails(optionValue).originalPrice }}</span>
              </div>
              <h4 class="text-xl font-semibold text-white">
                {{ getPlanDetails(optionValue).title }}
              </h4>
            </div>

            <!-- Features -->
            <div class="flex-1 space-y-4 mb-8 w-full">
              <div class="flex items-center text-white">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span class="text-lg">{{ getPlanDetails(optionValue).concepts }} {{ getPlanDetails(optionValue).concepts === '1x' ? 'unique signature logo concept' : 'unique signature logo concepts' }}</span>
              </div>

              <div class="flex items-center text-white">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span class="text-lg">{{ getPlanDetails(optionValue).revisions }}</span>
              </div>

              <div class="flex items-center text-white">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span class="text-lg">{{ getPlanDetails(optionValue).delivery }}</span>
              </div>

              <div class="flex items-center text-white">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span class="text-lg">{{ getPlanDetails(optionValue).format }}</span>
              </div>

              <div v-if="getPlanDetails(optionValue).extraFeature" class="flex items-center text-white">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span class="text-lg">{{ getPlanDetails(optionValue).extraFeature }}</span>
              </div>

              <div v-if="getPlanDetails(optionValue).extraFeature2" class="flex items-center text-white">
                <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span class="text-lg">{{ getPlanDetails(optionValue).extraFeature2 }}</span>
              </div>
            </div>

            <!-- Recommendation or Description -->
            <div v-if="getPlanDetails(optionValue).recommendation" class="text-left w-full">
              <p class="text-sm text-gray-400 italic">
                {{ getPlanDetails(optionValue).recommendation }}
              </p>
            </div>

            <div v-else-if="getPlanDetails(optionValue).description" class="text-left w-full">
              <p class="text-sm text-gray-400">
                {{ getPlanDetails(optionValue).description }}
              </p>
            </div>
          </div>
        </label>
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

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
