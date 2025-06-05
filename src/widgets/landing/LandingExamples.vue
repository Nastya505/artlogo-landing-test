<script setup lang="ts">
import AppButton from '../../shared/components/AppButton.vue';
import { ref } from 'vue';

withDefaults(defineProps<Props>(), {
  title: 'Create Your Signature Logo',
  subtitle: 'Make your unique signature, signature logo and watermark. Sign your documents, brand your content and name with the unique logo handwritten by a professional calligrapher.',
  buttonText: 'Create Artlogo',
});
// Form data
const signatureText = ref('');
const taglineText = ref('');

interface Props {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

function handleCreateLogo() {
  // Сохраняем данные в localStorage для использования на другой странице
  if (signatureText.value || taglineText.value) {
    const formData = {
      signatureText: signatureText.value,
      taglineText: taglineText.value,
      timestamp: Date.now(),
    };
    localStorage.setItem('artlogo-form-data', JSON.stringify(formData));
  }
}
</script>

<template>
  <section class=" max-w-[1680px] mx-auto">
    <div class="w-full gap-10 md:gap-16 mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8 md:mb-12">
        <h2 class="text-3xl md:text-5xl font-normal text-white mb-5 md:mb-10 leading-tight">
          {{ title }}
        </h2>
        <p class="text-gray-300 text-base md:text-2xl mx-auto leading-relaxed">
          {{ subtitle }}
        </p>
      </div>

      <!-- Form -->
      <div class="w-full flex flex-col gap-10 md:gap-16 items-center justify-center">
        <div class="w-full flex flex-col justify-between items-end lg:flex-row gap-10 lg:gap-8">
          <!-- Signature Text Input -->
          <div class=" w-full">
            <label class="block text-white font-medium mb-3 text-left text-xl md:text-3xl">
              What would you like your Signature Logo to say?
            </label>
            <input
              v-model="signatureText"
              type="text"
              placeholder="Enter the text for your signature here"
              class="w-full p-5 bg-white/20 border border-white rounded-lg text-white placeholder-white/50 focus:border-blue-500 focus:outline-none text-base md:text-lg transition-colors duration-300"
            >
          </div>

          <!-- Tagline Input -->
          <div class=" w-full">
            <label class="block text-white font-medium mb-3 text-left text-xl md:text-3xl">
              Add a tagline (if you'd like)
            </label>
            <input
              v-model="taglineText"
              type="text"
              placeholder="Enter your slogan (optional)"
              class="w-full p-5 bg-white/20 border border-white rounded-lg text-white placeholder-white/50 focus:border-blue-500 focus:outline-none text-base md:text-lg transition-colors duration-300"
            >
          </div>
        </div>
        <!-- Create Button -->
        <div class="text-center w-full">
          <AppButton
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
