<script setup lang="ts">
import type { Stripe, StripeElements } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ElMessage } from 'element-plus';

import { onMounted, ref } from 'vue';

interface CartData {
  lineItems: any[];
  options: any[];
  customParams: Record<string, any>;
  totalPrice: {
    price: number;
    compare_at_price: number;
  };
  selectedVariant: {
    id: number;
    title: string;
    price: number;
    compareAtPrice: number;
  };
}

const cartData = ref<CartData | null>(null);
const isLoading = ref(true);
const stripe = ref<Stripe | null>(null);
const elements = ref<StripeElements | null>(null);
const card = ref<any>(null);

async function initializeStripe() {
  try {
    const stripeInstance = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    if (!stripeInstance) {
      throw new Error('Failed to load Stripe');
    }
    stripe.value = stripeInstance;

    elements.value = stripeInstance.elements({
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#f97316',
          colorBackground: '#ffffff',
          colorText: '#1f2937',
          colorDanger: '#ef4444',
          fontFamily: 'Inter, system-ui, sans-serif',
          spacingUnit: '4px',
          borderRadius: '8px',
        },
      },
    });

    card.value = elements.value.create('card', {
      style: {
        base: {
          'fontSize': '16px',
          'color': '#1f2937',
          '::placeholder': {
            color: '#9ca3af',
          },
        },
      },
    });

    setTimeout(() => {
      const cardElementContainer = document.getElementById('card-element');
      if (cardElementContainer) {
        card.value.mount('#card-element');
      } else {
        console.error('Card element container not found');
      }
    }, 100);
  } catch (error) {
    console.error('Error initializing Stripe:', error);
  }
}

onMounted(async () => {
  try {
    const savedData = localStorage.getItem('cartData');
    if (savedData) {
      cartData.value = JSON.parse(savedData);
    } else {
      console.warn('No cart data found in localStorage');
    }

    await initializeStripe();
  } catch (error) {
    console.error('Error in onMounted:', error);
  } finally {
    isLoading.value = false;
  }
});

async function handleSubmit() {
  if (!stripe.value || !elements.value || !cartData.value) {
    return;
  }

  try {
    const { error, paymentMethod } = await stripe.value.createPaymentMethod({
      type: 'card',
      card: card.value,
      billing_details: {
        name: cartData.value.customParams.signature_name || 'Customer',
        email: 'customer@example.com',
      },
    });

    if (error) {
      console.error('Payment error:', error.message);
      ElMessage.error({
        message: error.message || 'Payment failed. Please try again.',
      });
    } else {
      ElMessage.success({
        message: `Payment successful ${paymentMethod.id}`,
      });
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    ElMessage.error({
      message: 'Error processing payment. Please try again.',
    });
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="isLoading" class="text-center h-screen flex flex-col items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto" />
      <p class="mt-4 text-lg">
        Loading cart data...
      </p>
    </div>

    <div v-else-if="cartData" class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">
        Your Cart
      </h1>

      <!-- Selected Product -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">
          Selected Product
        </h2>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-lg">
              {{ cartData.selectedVariant.title }}
            </p>
          </div>
          <div class="text-right">
            <p
              v-if="cartData.selectedVariant.compareAtPrice > cartData.selectedVariant.price"
              class="text-gray-500 line-through"
            >
              ${{ (cartData.selectedVariant.compareAtPrice / 100).toFixed(2) }}
            </p>
            <p class="text-lg font-semibold">
              ${{ (cartData.selectedVariant.price / 100).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Custom Parameters -->
      <div v-if="cartData && Object.keys(cartData.customParams).length > 0" class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">
          Custom Options
        </h2>
        <div class="space-y-2">
          <div
            v-for="(value, key) in cartData.customParams"
            v-show="key !== 'variant_selector' && value !== false && value !== 'true' && value !== 'false' && value !== null && value !== undefined && value !== ''"
            :key="key"
            class="flex justify-between"
          >
            <span class="text-gray-600">{{ key }}:</span>
            <span>{{ value }}</span>
          </div>
          <div
            v-for="option in cartData?.options?.filter((opt: any) => opt.type === 'product_switch' && cartData?.customParams[opt.cart_label] === 'true')"
            :key="option.cart_label"
            class="flex justify-between"
          >
            <span class="text-gray-600">{{ option.product_label }}:</span>
            <span>${{ (option.product_price / 100).toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <!-- Total Price -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">
          Total
        </h2>
        <div class="flex justify-between items-center">
          <span class="text-lg">Total Price:</span>
          <div class="text-right">
            <p
              v-if="cartData.totalPrice.compare_at_price > cartData.totalPrice.price"
              class="text-gray-500 line-through"
            >
              ${{ (cartData.totalPrice.compare_at_price / 100).toFixed(2) }}
            </p>
            <p class="text-2xl font-bold">
              ${{ (cartData.totalPrice.price / 100).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Payment Form -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">
          Payment Details
        </h2>
        <form id="payment-form" class="space-y-4" @submit.prevent="handleSubmit">
          <div v-show="!isLoading">
            <div id="card-element" class="p-3 border border-gray-300 rounded-lg min-h-[40px]" />
            <div id="card-errors" class="text-red-500 text-sm mt-2" role="alert" />
          </div>
          <button
            type="submit"
            class="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Processing...' : `Pay $${(cartData?.totalPrice?.price / 100).toFixed(2)}` }}
          </button>
        </form>
      </div>
    </div>

    <div v-else class="text-center">
      <p class="text-lg text-gray-600">
        No items in cart
      </p>
      <a href="/" class="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
        Return to Product
      </a>
    </div>
  </div>
</template>

<style scoped>
#card-element {
  min-height: 40px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.StripeElement--focus {
  border-color: #f97316;
  box-shadow: 0 0 0 1px #f97316;
}

.StripeElement--invalid {
  border-color: #ef4444;
}

.StripeElement--webkit-autofill {
  background-color: #fef3c7 !important;
}
</style>
