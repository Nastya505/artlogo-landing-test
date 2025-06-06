<script setup lang="ts">
interface Props {
  title?: string;
  professions?: string[];
  buttonText?: string;
  buttonAction?: () => void;
}

withDefaults(defineProps<Props>(), {
  title: 'Artlogo – trusted by top professionals',
  professions: () => [
    'real estate agent',
    'fitness trainer',
    'coach',
    'business consultant',
    'lawyer',
    'photographer',
    'youtube blogger',
    'teacher',
    'travel agent',
    'entrepreneur',
    'videographer',
    'film maker',
    'ceo',
    'interior designer',
    'accountant',
    'musician',
    'sommelier',
    'life coach',
    'doctor',
    'sales',
    'and many others...',
  ],
  buttonText: 'Get Yours Now',
  buttonAction: () => {
    window.location.href = '/signature-logo';
  },
});
</script>

<template>
  <section class="max-w-[1680px] mx-auto px-3">
    <div class="text-center mb-12">
      <h2 class="text-3xl lg:text-5xl font-normal text-white mb-12">
        {{ title }}
      </h2>

      <div class="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
        <span
          v-for="(profession, index) in professions"
          :key="index"
          class="profession-tag px-4 py-2 border border-gray-400 rounded-lg text-white text-sm md:text-base transition-all duration-300 cursor-pointer"
        >
          {{ profession }}
        </span>
      </div>

      <button
        class="bg-blue-600 hover:bg-orange-500 text-white  w-full md:w-auto px-12 py-2 md:py-4 rounded-full font-semibold text-xl transition-all duration-300 transform hover:scale-105"
        @click="buttonAction"
      >
        {{ buttonText }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.profession-tag:hover {
  border-radius: 8px;
  border: 1px solid #FFF;
  box-shadow:
    0px 0px 250px 0px #0277FF,
    inset 0px 0px 35px 0px #0277FF,
    0px 0px 250px 0px #0277FF,
    0px 0px 233.1px 0px #0277FF,
    0px 0px 116.55px 0px #0277FF,
    0px 0px 33.3px 0px #0277FF,
    0px 0px 16.65px 0px #0277FF;
}
</style>
