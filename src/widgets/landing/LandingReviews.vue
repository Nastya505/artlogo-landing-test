<script setup lang="ts">
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Review {
  id: number;
  name: string;
  title: string;
  rating: number;
  date: string;
  text: string;
  image: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Federico Phelps Corasoli',
    title: 'Business Owner',
    rating: 5,
    date: 'Apr 4, 2023',
    text: 'I would like to express my sincere gratitude to Artlogo for creating the perfect and sleek logo for me. They worked quickly and with precision, ensuring that every detail was taken care of.\n\nFrom start to finish, Artlogo was professional and easy to work with. They took the time to understand my vision and provided valuable input to help bring it to life. Their expertise and attention to detail truly shone through in the final product.\n\nI am absolutely thrilled with my new logo and have received many compliments on it. It has added a professional and polished touch to my brand, and I couldn\'t be happier with the outcome.\n\nThank you, Artlogo, for your exceptional work and dedication. I would highly recommend their services to anyone looking for a high-quality and stunning logo design.',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-review-1.webp?v=1749045282',
  },
  {
    id: 2,
    name: 'Jackson Wright',
    title: 'Lawyer',
    rating: 5,
    date: 'Mar 15, 2023',
    text: 'Outstanding service from Artlogo! The team delivered exactly what I was looking for - a professional signature that represents my brand perfectly.\n\nThe process was smooth and efficient. They understood my requirements from the first consultation and provided multiple options to choose from. The final result exceeded my expectations.\n\nI\'ve been using my new signature for all business communications and have received numerous positive comments from clients and colleagues. It has definitely enhanced my professional image.\n\nHighly recommend Artlogo for anyone looking to elevate their brand with a custom signature design.',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/SignatureConcept09.webp?v=1741967575',
  },
];

// Swiper configuration
const modules = [Navigation, Pagination, Autoplay];
</script>

<template>
  <section class="max-w-[1680px] mx-auto px-3">
    <!-- Header -->
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
        class="reviews-swiper"
      >
        <SwiperSlide v-for="review in reviews" :key="review.id">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
            <!-- Left side: Image with signature -->
            <div class="relative">
              <!-- Person image -->
              <div class="relative z-10 flex items-center justify-center">
                <img
                  :src="review.image"
                  :alt="review.name"
                  class="w-full h-full object-cover rounded-xl shadow-lg"
                >
              </div>
            </div>

            <!-- Right side: Review text -->
            <div class="bg-white rounded-2xl p-7 text-black">
              <!-- Review header -->
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span class="text-green-600 font-bold text-lg">{{ review.name.charAt(0) }}</span>
                </div>
                <div>
                  <h4 class="font-semibold text-lg">
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

              <!-- Review title -->
              <h3 class="text-xl font-bold mb-2 text-green-600">
                Perfection!
              </h3>

              <!-- Review text -->
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
      <div class="flex justify-center items-center mt-8 space-x-4">
        <button
          class="review-prev w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <svg class="w-5 h-5 text-white group-hover:text-orange-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          class="review-next w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <svg class="w-5 h-5 text-white group-hover:text-orange-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hide default Swiper navigation */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  display: none !important;
}

/* Custom review navigation styling */
.review-prev:hover,
.review-next:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .grid-cols-1.lg\\:grid-cols-2 {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
