<script setup lang="ts">
interface Feature {
  icon: string;
  iconAlt: string;
  title: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  features: Feature[];
}

withDefaults(defineProps<Props>(), {
  title: 'Why Artlogo?',
  subtitle: 'Your name is your identity—make it unforgettable',
});
</script>

<template>
  <section class="max-w-5xl mx-auto px-3">
    <!-- Header -->
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-5xl font-normal text-white mb-6">
        {{ title }}
      </h2>
      <p class="text-gray-300 text-base md:text-2xl">
        {{ subtitle }}
      </p>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="text-center"
      >
        <div class="w-24 h-24 mx-auto mb-4 lg:mb-6 flex items-center justify-center">
          <img
            :src="feature.icon"
            :alt="feature.iconAlt"
            class="w-full h-full object-contain"
          >
        </div>
        <h3 class="text-white font-semibold text-base md:text-lg  leading-tight">
          {{ feature.title }}
        </h3>
      </div>
    </div>
  </section>
</template>
