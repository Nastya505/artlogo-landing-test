<script setup lang="ts">
import { AppInput } from '@/shared/ui';
import {
  LandingFooter,
  LandingNavigation,
  ProgressSteps,
  SwiperPricing,
} from '@/widgets/landing';
import ArtlogoProductOptions from '@/widgets/product-options/ArtlogoProductOptions.vue';
import { onMounted, ref } from 'vue';

const signatureText = ref('');
const taglineText = ref('');

onMounted(() => {
  const savedData = localStorage.getItem('artlogo-form-data');
  if (savedData) {
    try {
      const formData = JSON.parse(savedData);
      signatureText.value = formData.signatureText || '';
      taglineText.value = formData.taglineText || '';
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
    }
  }
});
</script>

<template>
  <div class="bg-[#000105] font-montserrat overflow-x-hidden">
    <LandingNavigation />
    <ProgressSteps class="my-20 md:mt-24" />
    <ArtlogoProductOptions
      product-handle="signature-logo"
      currency="USD"
    />
    <LandingFooter />
  </div>
</template>
