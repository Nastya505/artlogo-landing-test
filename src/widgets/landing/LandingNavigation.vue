<script setup lang="ts">
import AppButton from '../../shared/components/AppButton.vue';

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
  // Блокируем скролл страницы когда меню открыто
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
  // Переход на страницу заказа
  window.location.href = '/order';
}

// Закрытие меню при изменении размера экрана
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  };

  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    // Восстанавливаем скролл при размонтировании компонента
    document.body.style.overflow = 'auto';
  });
});
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 py-3">
    <!-- Черный фон -->
    <div class="absolute inset-0 bg-black" />
    <!-- Белый полупрозрачный слой -->
    <div class="absolute inset-0 bg-white/80 backdrop-blur-sm" />

    <!-- Контент навигации -->
    <div class="relative max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center ">
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            href="#reviews"
            class="text-black hover:text-orange-500 text-xl font-semibold transition-colors duration-200"
          >
            Reviews
          </a>
          <a
            href="#examples"
            class="text-black hover:text-orange-500 text-xl font-semibold transition-colors duration-200"
          >
            Examples
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

        <!-- CTA Button -->
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
      >
      <!-- Header в полноэкранном меню -->
      <div class="flex justify-between items-center h-16 px-4 border-b border-gray-800">
        <!-- Кнопка закрытия -->
        <button
          class="text-white hover:text-gray-300 transition-colors duration-200"
          @click="closeMenu"
        >
          <svg class="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Логотип -->
        <div class="flex-1 text-center">
          <NuxtLink to="/" class="inline-block" @click="closeMenu">
            <img
              src="https://cdn.shopify.com/s/files/1/0594/4639/5086/files/logo_x2_120x_2x_84098a99-4e24-47ac-9a25-6db16c6b1ac1.png?v=1713515548"
              alt="Logo"
              class="w-32 h-auto mx-auto"
            >
          </NuxtLink>
        </div>

        <!-- Пустое место для симметрии -->
        <div class="w-6" />
      </div>

      <!-- Меню навигации -->
      <div class="flex-1 flex flex-col justify-center items-center space-y-8">
        <a
          href="#examples"
          class="text-white text-3xl font-semibold hover:text-orange-500 transition-colors duration-200"
          @click="closeMenu"
        >
          Examples
        </a>
        <a
          href="#reviews"
          class="text-white text-3xl font-semibold hover:text-orange-500 transition-colors duration-200"
          @click="closeMenu"
        >
          Reviews
        </a>

        <!-- CTA Button в меню -->
        <div class="mt-8">
          <AppButton
            text="Get My Artlogo"
            variant="secondary"
            size="md"
            @click="handleOrderClick"
          />
        </div>
      </div>
    </div>
  </nav>
</template>
