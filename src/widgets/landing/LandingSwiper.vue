<script setup lang="ts">
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface UseCase {
  id: number;
  title: string;
  description: string;
  image: string;
}

const useCases: UseCase[] = [
  {
    id: 1,
    title: 'Social media posts',
    description: 'Use Artlogo Signature on Instagram, Facebook and Youtube posts, stories and videos to create an impressive brand image and attract more clients',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/Social_media_posts.png?v=1684693435',
  },
  {
    id: 2,
    title: 'Email Signature',
    description: 'Use Artlogo signature in your email footer. This will boost your personal brand everyday and increase your email replies and leads',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/Email_signature.png?v=1684694043',
  },
  {
    id: 3,
    title: 'E-signature',
    description: 'Impress the recipients of emails with a completely irresistible signature in one click. Yes, no more unnecessary actions.',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/E-signature.png?v=1684694010',
  },
  {
    id: 4,
    title: 'Sign paper documents',
    description: 'Are you still using the same signature you created as a teenager? It\'s time to upgrade to a professional Artlogo signature',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/Sign_paper_documents_8a65c91b-f0f9-4335-a291-9d91bf5481cb.png?v=1684746873',
  },
  {
    id: 5,
    title: 'Social media profile',
    description: 'Use your personalized Artlogo signature as a distinctive logo on your Facebook cover or Instagram profile, giving your online presence a professional',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/Social_media_profile.png?v=1684693473',
  },
  {
    id: 6,
    title: 'Your Website',
    description: 'A customized logo crafted by Artlogo signals professionalism and attention to detail, helping you create a memorable brand experience',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/Your_Website.png?v=1684694111',
  },
  {
    id: 7,
    title: 'Business Cards',
    description: 'Adding your Artlogo signature to your business cards creates a distinctive impression, making you memorable and setting you apart from competitors',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/Business_Cards.png?v=1684693724',
  },
  {
    id: 8,
    title: 'Video Content',
    description: 'Present your clients with beautifully branded merchandise featuring your personalized Artlogo signature',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/Video_Content.png?v=1684693523',
  },
];

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
        :space-between="16"
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
        <SwiperSlide v-for="useCase in useCases" :key="useCase.id">
          <div class="bg-white/20 rounded-3xl sm:rounded-[36px] p-2 overflow-hidden border border-white w-full flex flex-col">
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
          class="custom-prev w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm shadow-md hover:-translate-y-px hover:shadow-lg active:translate-y-0"
          aria-label="Previous slide"
        >
          <svg class="w-5 h-5 text-white group-hover:text-orange-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          class="custom-next w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm shadow-md hover:-translate-y-px hover:shadow-lg active:translate-y-0"
          aria-label="Next slide"
        >
          <svg class="w-5 h-5 text-white group-hover:text-orange-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
