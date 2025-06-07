<script setup lang="ts">
import type { OptionBase } from '../model/types';

export interface PaymentTrustsOption extends OptionBase {
  type: 'payment_trusts';
}

const paymentMethodIcons: { src: string; alt: string }[] = [
  { src: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-paypal.png?v=1686768256', alt: 'PayPal' },
  { src: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-mastercard.png?v=1686768256', alt: 'Mastercard' },
  { src: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-maestro.png?v=1686768256', alt: 'Maestro' },
  { src: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-visa.png?v=1686768256', alt: 'Visa' },
  { src: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-amex.png?v=1686768256', alt: 'American Express' },
  { src: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-apple_pay.png?v=1686768256', alt: 'Apple Pay' },
  { src: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-google_pay.png?v=1686768256', alt: 'Google Pay' },
  { src: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-shop_pay.png?v=1686768256', alt: 'ShopPay' },
  { src: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-diners_club.png?v=1686768536', alt: 'Diners Club' },
  { src: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-discover.png?v=1686768256', alt: 'Discover' },
  { src: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-unionpay.png?v=1686768257', alt: 'UnionPay' },
];

const securityIcons: Record<'mobile' | 'desktop', { src: string; alt: string }[]> = {
  mobile: [
    { src: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/secure-ssl-encryption-mobile.png?v=1686770370', alt: 'Secure SSL-encryption' },
    { src: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/powered-by-shopify-payments-mobile.png?v=1686770370', alt: 'Powered by Shopify Payments' },
  ],
  desktop: [
    { src: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/secure-ssl-encryption.png?v=1686770370', alt: 'Secure SSL-encryption' },
    { src: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/powered-by-shopify-payments.png?v=1686770370', alt: 'Powered by Shopify Payments' },
  ],
};
</script>

<template>
  <div wg-ignore class="space-y-8">
    <div class="flex flex-wrap justify-center gap-4">
      <img
        v-for="icon in paymentMethodIcons" :key="icon.src"
        :data-src="icon.src" :alt="icon.alt"
        class="lazyload w-12"
        width="40" height="20"
      >
    </div>

    <div class="hidden md:flex justify-center gap-8">
      <img
        v-for="icon in securityIcons.desktop" :key="icon.src"
        :data-src="icon.src" :alt="icon.alt"
        class="lazyload h-14 w-auto max-w-[50%]"
        width="100" height="100"
      >
    </div>
    <div class="flex md:hidden justify-center gap-8">
      <img
        v-for="icon in securityIcons.mobile" :key="icon.src"
        :data-src="icon.src" :alt="icon.alt"
        class="lazyload h-24 w-auto max-w-[50%]"
        width="100" height="100"
      >
    </div>
  </div>
</template>
