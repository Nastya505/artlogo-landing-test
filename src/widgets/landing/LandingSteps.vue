<script setup lang="ts">
import { AppButton } from '@/shared/ui';

interface Step {
  id: number;
  title: string;
  description: string;
  media: string; // URL to image or video
  mediaType: 'image' | 'video';
  mediaAlt: string;
  imagePosition: 'left' | 'right';
  videoPoster?: string; // Poster image for video
}

interface Props {
  id?: string;
  title?: string;
  subtitle?: string;
  steps: Step[];
  buttonText?: string;
  buttonAction?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Step by Step',
  buttonText: 'Get Started Now',
});

function handleButtonClick() {
  if (props.buttonAction) {
    props.buttonAction();
  } else {
    navigateTo('/signature-logo');
  }
}
</script>

<template>
  <section class="max-w-[1680px] mx-auto px-3 text-center">
    <div v-if="title || subtitle" class="mb-10 md:mb-16">
      <h2
        v-if="title"
        class="text-3xl md:text-5xl font-normal text-white mb-4"
      >
        {{ title }}
      </h2>
      <p
        v-if="subtitle"
        class="text-gray-300 text-base md:text-2xl max-w-4xl mx-auto"
      >
        {{ subtitle }}
      </p>
    </div>

    <div class="space-y-10 md:space-y-24 mb-10 lg:mb-20">
      <div
        v-for="step in steps"
        :key="step.id"
        class="grid grid-cols-1 lg:grid-cols-2 md:gap-12 gap-5 items-start"
      >
        <div
          class="order-1"
          :class="step.imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'"
        >
          <!-- Video -->
          <video
            v-if="step.mediaType === 'video'"
            :poster="step.videoPoster"
            autoplay
            muted
            loop
            playsinline
            class="w-full max-h-[225px] sm:max-h-[500px] mx-auto rounded-2xl shadow-lg object-cover object-center"
            loading="lazy"
          >
            <source :src="step.media" type="video/mp4">
            <p class="text-white">Your browser doesn't support video playback.</p>
          </video>

          <!-- Image -->
          <img
            v-else
            :src="step.media"
            :alt="step.mediaAlt"
            class="w-full mx-auto rounded-2xl shadow-lg"
            loading="lazy"
          >
        </div>

        <div
          class="order-2"
          :class="step.imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1'"
        >
          <div class="items-start mb-6 hidden lg:flex">
            <div class="w-16 h-16 flex-shrink-0 border-4 border-white border-solid rounded-full flex items-center justify-center mr-4">
              <span class="text-xl md:text-4xl font-bold text-white">{{ step.id }}</span>
            </div>
            <div class="flex flex-col gap-5 items-start justify-start">
              <h3 class="text-xl md:text-4xl font-bold text-white">
                {{ step.title }}
              </h3>
              <p class="text-gray-300 text-left text-base md:text-2xl leading-relaxed">
                {{ step.description }}
              </p>
            </div>
          </div>

          <div class="items-start flex flex-col gap-3 lg:hidden">
            <div class="flex items-center gap-5">
              <div class="w-9 h-9 flex-shrink-0 border-4 border-white border-solid rounded-full flex items-center justify-center">
                <span class="text-xl font-bold text-white">{{ step.id }}</span>
              </div>
              <h3 class="text-xl md:text-4xl font-bold text-white">
                {{ step.title }}
              </h3>
            </div>
            <p class="text-gray-300 text-left text-base md:text-2xl leading-relaxed">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex w-full md:w-auto justify-center items-center gap-5 flex-col text-center mt-10 lg:mt-20">
      <div class="flex items-center justify-center gap-2 md:gap-8">
        <img
          src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/icon-finger.webp?v=1748964730"
          alt="finger"
          class="w-10 h-auto lg:w-20"
          loading="lazy"
        >
        <div class="text-xl md:text-5xl text-white font-bold">
          It's that simple!
        </div>
      </div>

      <AppButton
        :text="buttonText"
        variant="primary"
        size="lg"
        @click="handleButtonClick"
      />
    </div>
  </section>
</template>
