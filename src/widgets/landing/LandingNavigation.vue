<script setup lang="ts">
import { AppButton } from '@/shared/ui';

const isMenuOpen = ref(false);

const navigationLinks = [
  { href: '/#reviews', text: 'Reviews' },
  { href: '/#examples', text: 'Examples' },
];

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}

function closeMenu() {
  isMenuOpen.value = false;
  document.body.style.overflow = 'auto';
}

function handleOrderClick() {
  closeMenu();
  navigateTo('/signature-logo');
}

onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  };

  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    document.body.style.overflow = 'auto';
  });
});
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 py-3">
    <div class="absolute inset-0 bg-black" />
    <div class="absolute inset-0 bg-white/80 backdrop-blur-sm" />

    <div class="relative w-full mx-auto px-3 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="link in navigationLinks"
            :key="link.href"
            :href="link.href"
            class="text-black hover:text-orange-500 text-xl font-semibold transition-colors duration-200"
          >
            {{ link.text }}
          </a>
        </div>

        <div class="md:hidden">
          <button
            class="text-black hover:text-gray-700 transition-colors duration-200"
            @click="toggleMenu"
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="11" width="28" height="2" fill="black" />
              <rect x="4" y="17" width="28" height="2" fill="black" />
              <rect x="4" y="23" width="28" height="2" fill="black" />
            </svg>
          </button>
        </div>

        <div class="flex-shrink-0 md:order-2">
          <NuxtLink to="/" class="flex items-center">
            <img
              src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/logo_x2_120x_2x_84098a99-4e24-47ac-9a25-6db16c6b1ac1.png?v=1713515548"
              alt="Logo"
              class="w-20 md:w-32 h-auto"
            >
          </NuxtLink>
        </div>

        <div class="md:order-3">
          <AppButton
            text="Get My Artlogo"
            variant="default"
            size="md"
            @click="handleOrderClick"
          />
        </div>
      </div>
    </div>

    <!-- Full-screen Mobile Navigation -->
    <div
      class="md:hidden fixed inset-0 bg-black z-50 flex flex-col transition-opacity duration-300 ease-out"
      :class="{ 'opacity-0 pointer-events-none': !isMenuOpen, 'opacity-100': isMenuOpen }"
    >
      <div class="flex justify-between items-center h-16 px-4 border-b border-gray-800">
        <button
          class="text-white hover:text-gray-300 transition-colors duration-200"
          @click="closeMenu"
        >
          <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="flex-1 text-center">
          <NuxtLink to="/" class="inline-block" @click="closeMenu">
            <img
              src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/logo_x2_120x_2x_84098a99-4e24-47ac-9a25-6db16c6b1ac1.png?v=1713515548"
              alt="Logo"
              class="w-32 h-auto mx-auto"
            >
          </NuxtLink>
        </div>

        <div class="w-6" />
      </div>

      <div class="flex-1 flex flex-col justify-center items-center space-y-8">
        <a
          v-for="link in navigationLinks"
          :key="link.href"
          :href="link.href"
          class="text-white text-3xl font-semibold hover:text-orange-500 transition-colors duration-200"
          @click="closeMenu"
        >
          {{ link.text }}
        </a>

        <div class="mt-8">
          <AppButton
            text="Get My Artlogo"
            variant="secondary"
            size="lg"
            @click="handleOrderClick"
          />
        </div>
      </div>
    </div>
  </nav>
</template>
