<script setup lang="ts">
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
} from './../widgets/landing';

// SEO Meta
useSeoMeta({
  title: 'Artlogo - Professional Logo Design & Digital Signatures',
  ogTitle: 'Artlogo - Professional Logo Design & Digital Signatures',
  description: 'Create stunning professional logos and digital signatures. Multipurpose design that represents you perfectly. Used by thousands of professionals worldwide.',
  ogDescription: 'Create stunning professional logos and digital signatures. Multipurpose design that represents you perfectly. Used by thousands of professionals worldwide.',
  ogImage: '/images/artlogo-hero.jpg',
  twitterCard: 'summary_large_image',
});

// Скрипт для плавного скролла к якорям
onMounted(() => {
  // Обработка якорных ссылок
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

  // Добавляем обработчики для всех якорных ссылок
  document.addEventListener('click', handleAnchorClick);

  onUnmounted(() => {
    document.removeEventListener('click', handleAnchorClick);
  });
});

const stepsData = [
  {
    id: 1,
    title: 'Place Your Order',
    description: 'Choose your preferred signature style and share any special requests. It takes just 2 minutes!',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-step-1.webp?v=1749010856',
    imageAlt: 'Choose your signature style',
    imagePosition: 'left',
  },
  {
    id: 2,
    title: 'We Create Your Design',
    description: 'Our professional calligraphers handcraft your signature or logo within 24-48 hours.',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-step-2.webp?v=1749010868',
    imageAlt: 'We create your design',
    imagePosition: 'right',
  },
  {
    id: 3,
    title: 'Approve & Use',
    description: 'Review the result, request free revisions if needed, and download your final design. Ready to impress!',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-step-3.webp?v=1749010877',
    imageAlt: 'Review the result',
    imagePosition: 'left',
  },

];
const featuresData = [
  {
    icon: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/icon-heart.webp?v=1748964830',
    iconAlt: 'Trusted by customers',
    title: 'Trusted by Over\n100,000 Customers',
  },
  {
    icon: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/icon-time.webp?v=1748964879',
    iconAlt: 'Fast delivery',
    title: 'Preview Ready\nin 1-2 Days',
  },
  {
    icon: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/icon-successfully.webp?v=1748964943',
    iconAlt: 'Free revisions',
    title: 'Unlimited Free\nRevisions Guaranteed',
  },
  {
    icon: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/icon-tree.webp?v=1748964861',
    iconAlt: 'Lifetime value',
    title: 'One-time Investment,\nLifetime Value',
  },
];
</script>

<template>
  <div class="bg-[#000105] font-montserrat overflow-x-hidden">
    <LandingNavigation />
    <LandingHero />
    <div class="space-y-20 md:space-y-40">
      <LandingFeatures
        :features="featuresData"
        title="Why Artlogo?"
        subtitle="Your name is your identity—make it unforgettable"
      />
      <LandingProfessions />
      <LandingSteps
        :steps="stepsData"
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
