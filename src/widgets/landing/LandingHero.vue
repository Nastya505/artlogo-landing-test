<script setup lang="ts">
import { AppButton } from '@/shared/ui';

interface Props {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  backgroundImage?: string;
  decorativeImage?: string;
  heroImages?: string[];
}

withDefaults(defineProps<Props>(), {
  title: 'Create Your<br><span class="font-bold">Signature</span><br>Logo',
  subtitle: 'A unique signature logo to elevate your brand',
  buttonText: 'Get Started',
  backgroundImage: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-bg.webp?v=1748964468',
  decorativeImage: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-decor-1.webp?v=1748963847',
  heroImages: () => [
    'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-signature-1.webp?v=1748964164',
    'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-signature-2.webp?v=1748964150',
  ],
});

function handleStartDesign() {
  navigateTo('/signature-logo');
}
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- Background image -->
    <img
      src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-bg.webp?v=1748964468"
      alt="Background"
      class="absolute scale-[3] lg:scale-100 w-[1500px] lg:w-full h-auto -right-[130%] lg:-right-2/3 top-60 lg:-top-56"
    >
    <div class="relative max-w-[1680px] flex-wrap mx-auto px-3 pt-12 md:pt-20 lg:pt-32 lg:pb-32 pb-24 flex items-center">
      <img
        src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-decor-1.webp?v=1748963847"
        alt="Decorative elements"
        class="absolute -top-10 sm:-top-5 lg:top-20 left-10 sm:left-16 w-full lg:w-1/2 h-[450px] lg:h-auto object-contain block"
      >

      <!-- Mobile Layout -->
      <div class="flex flex-col items-center w-full lg:hidden">
        <!-- Mobile Content -->
        <div class="text-center mb-8 mt-8">
          <h1
            class="font-normal text-white leading-none mb-6"
            style="font-size: clamp(2rem, 8vw, 3rem);"
          >
            Create Your
            <br>
            <span class="font-bold">Signature</span>
            <br>
            Logo
          </h1>

          <p class="font-normal text-lg text-white max-w-xs mx-auto">
            A unique signature logo to
            <br>
            elevate your brand
          </p>
        </div>

        <!-- Mobile Signature examples -->
        <div class="relative w-full mb-8">
          <!-- First signature example -->
          <div class="mb-6">
            <img
              src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-signature-1.webp?v=1748964164"
              alt="Marvelous Investment Banker Signature"
              class="w-4/5 filter drop-shadow-lg"
            >
          </div>

          <!-- Second signature example -->
          <div>
            <img
              src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-signature-2.webp?v=1748964150"
              alt="Steve Johnson Wine Consultant Signature"
              class="w-4/5 mx-auto sm:ml-40 filter drop-shadow-lg"
            >
          </div>
        </div>

        <!-- Mobile Get Started Button -->
        <AppButton
          text="Get Started"
          variant="primary"
          size="lg"
          @click="handleStartDesign"
        />
      </div>

      <!-- Desktop Layout -->
      <div class="hidden lg:flex flex-row justify-between gap-8 lg:gap-12 items-center w-full">
        <!-- Content -->
        <div class="text-center lg:text-left w-[47%] max-w-full">
          <!-- Circular badge with text -->
          <div class="relative mb-8 mt-20 lg:-mt-20 2xl:-mt-40 w-full">
            <div class="w-full mx-auto lg:mx-0 flex items-center justify-center relative">
              <div class="text-center z-10">
                <h1
                  class="font-normal text-white leading-none mb-12"
                  style="font-size: clamp(2.5rem, 5vw, 6rem);"
                >
                  Create Your
                  <br>
                  <span class="font-bold">Signature</span>
                  <br>
                  Logo
                </h1>

                <p class="font-normal text-2xl 2xl:text-3xl text-white w-full mx-auto">
                  A unique signature logo to
                  <br>
                  elevate your brand
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right side - Signature examples -->
        <div class="relative lg:pl-8 w-full lg:w-[45%]">
          <!-- First signature example -->
          <div class="mb-4 -ml-48 2xl:-ml-56 lg:mb-8">
            <img
              src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-signature-1.webp?v=1748964164"
              alt="Marvelous Investment Banker Signature"
              class="w-full max-w-[600px] 2xl:max-w-[800px] mx-auto lg:mx-0 filter drop-shadow-lg"
            >
          </div>

          <!-- Second signature example -->
          <div class="ml-4 lg:ml-8">
            <img
              src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-signature-2.webp?v=1748964150"
              alt="Steve Johnson Wine Consultant Signature"
              class="w-full max-w-[800px] mx-auto lg:mx-0 filter drop-shadow-lg"
            >
          </div>
        </div>
      </div>

      <div class="hidden lg:flex justify-center w-full">
        <AppButton
          text="Get Started"
          variant="primary"
          size="lg"
          @click="handleStartDesign"
        />
      </div>
    </div>
  </section>
</template>
