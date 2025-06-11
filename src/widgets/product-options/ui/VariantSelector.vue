<script setup lang="ts">
import type { Swiper as SwiperType } from 'swiper';
import { useMediaQuery } from '@vueuse/core';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed, nextTick, onMounted, ref } from 'vue';
import { useOptionsStore } from '../model/OptionsStore';
import 'swiper/css';
import 'swiper/css/pagination';

const props = defineProps<{ option: VariantSelectorOption }>();

interface VariantSelectorVariant {
  id: number;
  title: string;
  price: number;
  compare_at_price: number;
  description: string;
  inventory_quantity: number;
}
export interface VariantSelectorOption {
  type: 'variant_selector';
  badges: string[];
  show_inventory_quantity: boolean;
  sale_name: string;
  variants: [VariantSelectorVariant, ...VariantSelectorVariant[]];
  default_variant_index: number;
}

const optionsStore = useOptionsStore();
const isDesktop = useMediaQuery('(min-width: 1023px)');
const swiperRef = ref<SwiperType | null>(null);

onMounted(() => {
  const idx = props.option.default_variant_index ?? 1;
  const variant = props.option.variants[idx] || props.option.variants[0];
  if (variant) {
    optionsStore.setMainProduct({
      variantId: variant.id,
      price: variant.price,
      compareAtPrice: variant.compare_at_price,
      title: variant.title,
      quantity: 1,
    });
  }
});

function selectVariant(variant: VariantSelectorVariant) {
  optionsStore.setMainProduct({
    variantId: variant.id,
    price: variant.price,
    compareAtPrice: variant.compare_at_price,
    title: variant.title,
    quantity: 1,
  });
}

function getPlanDetails(title: string) {
  const plans: Record<string, any> = {
    'Calligrapher': {
      name: 'Basic',
      concepts: '1x',
      revisions: 'unlimited revisions',
      features: [
        '2 revision rounds',
        'Standard delivery (5–7 days)',
        'Digital files (PNG)',
      ],
      description: 'Great first step to establish your professional identity',
      isPopular: false,
    },
    'Top Level Calligrapher': {
      name: 'Most Popular',
      concepts: '3x',
      revisions: 'unlimited revisions',
      features: [
        '5 revision rounds',
        'Faster delivery (3–5 days)',
        'Priority customer support',
        '1 free minor change within 30 days',
      ],
      description: 'Recommended by 78% of our clients for optimal quality/price balance',
      isPopular: true,
    },
    'Head Calligrapher': {
      name: 'Premium',
      concepts: '5x',
      revisions: 'unlimited revisions',
      features: [
        'Unlimited revisions ',
        'Faster delivery (24–48 hours)',
        'Dedicated account manager',
        '3 free changes within 60 days',
        'Priority customer support',
      ],
      description: 'For those who demand perfection and premium service',
      isPopular: false,
    },
  };
  return plans[title] || {};
}

const planFeatures = computed(() =>
  props.option.variants.reduce((acc, variant) => {
    const plan = getPlanDetails(variant.title);
    acc[variant.id] = [
      ...plan.features.map((feature: string) => ({ label: feature, key: feature })),
    ].filter(Boolean);
    return acc;
  }, {} as Record<number, { label: string; key: string }[]>),
);
</script>

<template>
  <section>
    <div class="text-center mb-12 max-w-[1680px] mx-auto">
      <h2 class="text-3xl md:text-5xl font-normal text-white mb-5 md:mb-10 leading-tight">
        Create Your Signature Logo
      </h2>
      <p class="text-gray-300 text-base md:text-2xl leading-relaxed">
        Make your unique signature logo and watermark. Sign your documents, brand your content and name with the unique logo handwritten by a professional calligrapher
      </p>
    </div>

    <Swiper
      :modules="[Pagination]"
      :allow-touch-move="!isDesktop"
      :pagination="!isDesktop && { clickable: true }"
      :space-between="16"
      :initial-slide="props.option.default_variant_index ?? 1"
      centered-slides
      :breakpoints="{ 320: { slidesPerView: 1.1 }, 768: { slidesPerView: 1.1 }, 1024: { slidesPerView: 3 } }"
      class="pricing-swiper !pb-16 lg:!pb-0"
      @swiper="swiperRef = $event"
    >
      <SwiperSlide
        v-for="variant in props.option.variants"
        :key="variant.id"
        class="h-auto"
      >
        <label class="block h-full cursor-pointer" @click="selectVariant(variant)">
          <div
            class="relative h-full flex flex-col justify-between gap-5 lg:gap-10 rounded-[40px] border-2 p-5 transition-all duration-300  "
            :class="{
              'border-blue-500 bg-blue-500/5': optionsStore.mainProduct.variantId === variant.id,
              'border-white bg-transparent': optionsStore.mainProduct.variantId !== variant.id,
            }"
          >
            <span
              v-if="getPlanDetails(variant.title).isPopular"
              class="absolute top-5 right-5 bg-orange-500 text-white px-3 py-1 leading-normal rounded-md text-sm font-semibold"
            >
              Best Value
            </span>

            <div class="flex flex-col justify-between  gap-10 text-left w-full pt-12">
              <div class="flex flex-col gap-5">
                <h3 class="text-2xl lg:text-4xl font-bold text-white">
                  {{ getPlanDetails(variant.title).name }}
                </h3>
                <div class=" flex items-center">
                  <span class="text-4xl lg:text-5xl font-semibold text-white">${{ (variant.price / 100).toFixed(2) }}</span>
                  <span
                    v-if="variant.compare_at_price > variant.price"
                    class="text-xl lg:text-2xl text-gray-400 ml-2 line-through"
                  >
                    ${{ (variant.compare_at_price / 100).toFixed(2) }}
                  </span>
                </div>
              </div>

              <h4 class="text-xl lg:text-3xl font-semibold text-white">
                {{ variant.title }}
              </h4>
              <p class=" flex items-center text-sm lg:text-xl font-semibold text-white">
                <img src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/icon-card.webp?v=1749629054" alt="icon-card" class="w-7 h-5 mr-2">
                <span class="font-black"> {{ getPlanDetails(variant.title).concepts }} </span>
                <span class="font-normal ml-2">   {{ getPlanDetails(variant.title).revisions }}</span>
              </p>

              <div class="flex-1 flex flex-col gap-2 text-white text-lg">
                <div v-for="feature in planFeatures[variant.id]" :key="feature.key" class="flex items-center text-white">
                  <svg class="w-5 h-5 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                  <span class="text-lg">{{ feature.label }}</span>
                </div>
              </div>

            </div>
            <div class="text-left w-full text-sm lg:text-lg text-gray-400">
              {{ getPlanDetails(variant.title).description }}
            </div>
          </div></label>
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
