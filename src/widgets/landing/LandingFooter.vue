<script setup lang="ts">
import { PAY_METHODS } from '@/shared/config/landing';

import { reactive } from 'vue';

interface NewsletterForm {
  email: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

// Newsletter form state
const newsletterForm = reactive<NewsletterForm>({
  email: '',
  isSubmitting: false,
  isSuccess: false,
  error: null,
});

// Newsletter submission with discount
async function handleNewsletterSubmit() {
  if (!newsletterForm.email) {
    newsletterForm.error = 'Please enter your email address';
    return;
  }

  const emailPattern = /^[\w.%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;
  if (!emailPattern.test(newsletterForm.email)) {
    newsletterForm.error = 'Please enter a valid email address';
    return;
  }

  newsletterForm.isSubmitting = true;
  newsletterForm.error = null;

  try {
    // API call to subscribe and get discount
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Save email for discount
    localStorage.setItem('artlogo-discount-email', newsletterForm.email);
    localStorage.setItem('artlogo-discount-applied', 'true');

    newsletterForm.isSuccess = true;
    newsletterForm.email = '';

    // Reset success message after 5 seconds
    setTimeout(() => {
      newsletterForm.isSuccess = false;
    }, 5000);
  } catch {
    newsletterForm.error = 'Something went wrong. Please try again.';
  } finally {
    newsletterForm.isSubmitting = false;
  }
}
</script>

<template>
  <footer class="mt-24">
    <div class="max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8">
      <!-- Main discount section -->
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-4xl font-medium md:font-bold text-white mb-8 tracking-wide">
          GET 10% DISCOUNT ON YOUR FIRST PURCHASE
        </h2>

        <!-- Newsletter form -->
        <form class="max-w-3xl mx-auto" @submit.prevent="handleNewsletterSubmit">
          <div class="flex flex-col md:flex-row justify-center items-center w-full gap-2">
            <input
              v-model="newsletterForm.email"
              type="email"
              placeholder="Enter your Email"
              class="flex-1 w-full md:w-auto p-5 bg-white/20 text-white border border-solid border-white focus:border-blue-500 focus:outline-none rounded-lg md:rounded-l-lg md:rounded-r-none placeholder-white/50  text-base"
              :disabled="newsletterForm.isSubmitting"
            >
            <button
              type="submit"
              :disabled="newsletterForm.isSubmitting"
              class="px-6 py-2 md:py-5 w-full md:w-auto bg-white border border-solid border-white text-black rounded-full md:rounded-r-lg md:rounded-l-none font-semibold hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-colors duration-300 disabled:opacity-50 whitespace-nowrap"
            >
              <span :class="newsletterForm.isSubmitting ? 'disabled:opacity-50' : ''">Subscribe</span>
            </button>
          </div>

          <!-- Error message -->
          <div v-if="newsletterForm.error" class="text-red-400 text-sm mt-3">
            {{ newsletterForm.error }}
          </div>

          <!-- Success message -->
          <div v-if="newsletterForm.isSuccess" class="text-green-400 text-sm mt-3">
            🎉 Great! Check your email for your 10% discount code!
          </div>
        </form>
      </div>

      <!-- Payment Methods Section -->
      <div class="text-center mb-8">
        <h3 class="text-white/70 text-sm mb-4 uppercase tracking-wider">
          Payment Methods
        </h3>
        <div class="flex flex-wrap justify-center items-center gap-3 max-w-4xl mx-auto">
          <div
            v-for="(payMethod, index) in PAY_METHODS"
            :key="index"
            class="flex items-center justify-center transition-transform hover:scale-105"
          >
            <img
              :src="payMethod"
              :alt="`Payment method ${index + 1}`"
              class="h-6 w-auto max-w-10 object-cover"
              loading="lazy"
            >
          </div>
        </div>
      </div>

      <div class="flex w-full justify-between items-center pb-5">
        <div class="text-white/50">
          © 2025, Artlogo
        </div>
        <NuxtLink to="/" class="flex items-center">
          <img
            src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/logo_x2_120x_2x_84098a99-4e24-47ac-9a25-6db16c6b1ac1.png?v=1713515548"
            alt="Logo"
            class="w-20 md:w-32 h-auto brightness-0 invert"
          >
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
