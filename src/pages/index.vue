<script setup lang="ts">
import { LANDING_FEATURES, LANDING_SEO, LANDING_STEPS } from '@/shared/config/landing';
import {
  LandingCTA,
  LandingExamples,
  LandingFeatures,
  LandingFooter,
  LandingHero,
  LandingNavigation,
  LandingProfessions,
  LandingReviews,
  LandingSteps,
  LandingSwiper,
} from '@/widgets/landing';

// SEO Meta
useSeoMeta({
  title: LANDING_SEO.title,
  ogTitle: LANDING_SEO.title,
  description: LANDING_SEO.description,
  ogDescription: LANDING_SEO.description,
  ogImage: LANDING_SEO.ogImage,
  twitterCard: 'summary_large_image',
});

onMounted(() => {
  const handleAnchorClick = (event: Event) => {
    const target = event.target as HTMLAnchorElement;
    if (target.hash) {
      event.preventDefault();
      const element = document.querySelector(target.hash);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  document.addEventListener('click', handleAnchorClick);

  onUnmounted(() => {
    document.removeEventListener('click', handleAnchorClick);
  });
});
</script>

<template>
  <div class="bg-[#000105] font-montserrat overflow-x-hidden">
    <LandingNavigation />
    <LandingHero />
    <div class="space-y-20 md:space-y-40">
      <LandingFeatures
        :features="LANDING_FEATURES"
        title="Why Artlogo?"
        subtitle="Your name is your identity—make it unforgettable"
      />
      <LandingProfessions />
      <LandingSteps
        :steps="LANDING_STEPS"
        title="Step by Step"
        button-text="Get Yours Now"
      />
      <LandingSwiper />
      <LandingExamples id="examples" />
      <LandingReviews id="reviews" />
      <LandingCTA />
      <LandingFooter />
    </div>
  </div>
</template>
