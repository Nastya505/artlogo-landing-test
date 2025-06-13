<!-- <script setup>
import { ArtlogoVueUIKit } from '@artlogo-co/ui-kit';

const config = {
  tusEndpoint: import.meta.env.NUXT_PUBLIC_TUS_ENDPOINT,
  meta: {
    title: 'Artlogo Pro',
    description: 'Artlogo Pro - Professional Logo Design Platform',
    viewport: 'width=device-width, initial-scale=1',
    charset: 'utf-8',
  },
};

useNuxtApp().vueApp.use(ArtlogoVueUIKit(config));
</script> -->

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>