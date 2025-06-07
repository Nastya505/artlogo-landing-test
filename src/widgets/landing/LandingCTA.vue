<script setup lang="ts">
import { AppButton } from '@/shared/ui';

interface Props {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  price?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Your Signature, Your Legacy—Start Today!',
  subtitle: 'Only $39 – One-time payment, lifetime impact',
  buttonText: 'Get My Signature Now',
  price: '$39',
});

function handleButtonClick() {
  navigateTo('/signature-logo');
}
</script>

<template>
  <section class="max-w-[1680px] mx-auto px-3 text-center">
    <h2 class="text-[40px] lg:text-8xl font-bold text-white leading-tight ">
      {{ title }}
    </h2>

    <p class="text-white text-2xl lg:text-5xl leading-relaxed mt-5 mb-10 md:my-16">
      {{ subtitle }}
    </p>

    <AppButton
      :text="buttonText"
      variant="primary"
      size="lg"
      @click="handleButtonClick"
    />
  </section>
</template>
