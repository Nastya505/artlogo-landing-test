<script setup lang="ts">
import StarIcon from './Star.svg?component';

defineProps<{ discount: string }>();
</script>

<template>
  <div class="w-14 md:w-16">
    <div class="relative flex items-center justify-center">
      <StarIcon class="w-full h-full text-accent-red" />
      <span class="absolute text-base md:text-xl text-white font-bold">{{ discount }}</span>
    </div>
  </div>
</template>
