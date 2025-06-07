<script setup lang="ts">
import { AppButton, AppInput } from '@/shared/ui';
import { ref } from 'vue';

withDefaults(defineProps<Props>(), {
  title: 'Create Your Signature Logo',
  subtitle: 'Make your unique signature, signature logo and watermark. Sign your documents, brand your content and name with the unique logo handwritten by a professional calligrapher.',
  buttonText: 'Create Artlogo',
});
const signatureText = ref('');
const taglineText = ref('');

interface Props {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

function handleCreateLogo() {
  if (signatureText.value || taglineText.value) {
    const formData = {
      signatureText: signatureText.value,
      taglineText: taglineText.value,
      timestamp: Date.now(),
    };
    localStorage.setItem('artlogo-form-data', JSON.stringify(formData));
    navigateTo('/signature-logo');
  }
}
</script>

<template>
  <section class="max-w-[1680px] mx-auto">
    <div class="w-full gap-10 md:gap-16 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8 md:mb-12">
        <h2 class="text-3xl md:text-5xl font-normal text-white mb-5 md:mb-10 leading-tight">
          {{ title }}
        </h2>
        <p class="text-gray-300 text-base md:text-2xl mx-auto leading-relaxed">
          {{ subtitle }}
        </p>
      </div>

      <div class="w-full flex flex-col gap-10 md:gap-16 items-center justify-center">
        <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8">
          <AppInput
            v-model="signatureText"
            label="What would you like your Signature Logo to say?"
            placeholder="Enter the text for your signature here"
            required
          />

          <AppInput
            v-model="taglineText"
            text-align="left"
            label="Add a tagline (if you'd like)"
            placeholder="Enter your slogan (optional)"
          />
        </div>

        <div class="text-center w-full">
          <AppButton
            text-align="left"
            :text="buttonText"
            variant="primary"
            size="lg"
            @click="handleCreateLogo"
          />
        </div>
      </div>
    </div>
  </section>
</template>
