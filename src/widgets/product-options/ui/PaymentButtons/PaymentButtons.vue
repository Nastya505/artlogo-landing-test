<script setup lang="ts">
import AppButton from '@/shared/ui/AppButton.vue';
import * as Sentry from '@sentry/browser';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';
import { useOptionsStore } from '../../model/OptionsStore';

export interface PaymentButtonsOption {
  type: 'payment_buttons';
  enable_express_checkout: boolean;
  button_text: string;
  go_after_click: 'cart' | 'checkout';
  checkout_provider: 'shopify' | 'stripe';
}

const props = defineProps<{ option: PaymentButtonsOption }>();
const optionsStore = useOptionsStore();
const isLoading = ref(false);
const acceptTermsAndConditions = ref(true);

const isValid = computed(() => acceptTermsAndConditions.value && optionsStore.validateAllOptions());

function checkIfReadyAndShowErrors() {
  if (!isValid.value) {
    if (!optionsStore.validateAllOptions()) {
      const firstOptionWithError = optionsStore.section.optionsSet.find((option: any) =>
        'cart_label' in option && optionsStore.errors[option.cart_label],
      )! as { cart_label: string };
      document.querySelector(`[data-cart-label="${firstOptionWithError.cart_label}"]`)?.scrollIntoView({
        behavior: 'smooth',
      });
      ElMessage.error({
        message: 'Some fields are not filled in correctly',
      });
      return false;
    }

    if (!acceptTermsAndConditions.value) {
      ElMessage.error({
        message: 'Please accept the Terms and Conditions',
      });
      return false;
    }
  }
  return true;
}

async function onClickCheckout() {
  const isReady = checkIfReadyAndShowErrors();
  if (!isReady) {
    return;
  }

  isLoading.value = true;

  try {
    const cartData = {
      lineItems: optionsStore.lineItems,
      options: optionsStore.section.optionsSet,
      customParams: optionsStore.mainProduct.customParams,
      totalPrice: optionsStore.cartTotal,
      selectedVariant: {
        id: optionsStore.mainProduct.variantId,
        title: optionsStore.mainProduct.title,
        price: optionsStore.mainProduct.price,
        compareAtPrice: optionsStore.mainProduct.compareAtPrice,
      },
    };

    localStorage.setItem('cartData', JSON.stringify(cartData));

    window.location.href = '/cart';
  } catch (e) {
    console.error('Error saving cart data:', e);
    Sentry.captureException(e, { level: 'fatal' });
    ElMessage.error({
      message: 'Could not add to cart. Please try again.',
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="space-y-10 lg:space-y-16">
    <div class="flex flex-col items-center">
      <div class="flex items-center justify-center gap-4">
        <input
          id="accept-terms-conditions"
          v-model="acceptTermsAndConditions"
          type="checkbox"
          name="Terms & Conditions"
          class="
            w-8 h-8 cursor-pointer inline-block relative appearance-none shrink-0
            before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border-2 before:border-solid before:rounded-md before:border-gray-300
            checked:before:bg-orange-500 checked:before:border-orange-500
            after:content-[''] after:absolute after:top-2 after:left-3 after:w-2 after:h-4 after:border-solid after:border-white after:border-t-0 after:border-l-0 after:border-r-2 after:border-b-2 after:rotate-45
            after:opacity-0 checked:after:opacity-100
          "
        >
        <label for="accept-terms-conditions" class="cursor-pointer text-base lg:text-2xl text-white inline-block text-left lg:text-center">
          I accept and agree to the <a href="https://artlogo.co/policies/terms-of-service" target="_blank" class="text-orange-500 underline">Terms and Conditions</a>
        </label>
      </div>

      <div v-if="!acceptTermsAndConditions" class="mt-3 text-base text-white text-center">
        You need to accept the Terms and Conditions above to continue with your order.
      </div>
    </div>
    <div class="max-w-xl mx-auto space-y-6">
      <AppButton
        :text="props.option.button_text"
        :disabled="isLoading"
        size="lg"
        variant="primary"
        full-width
        @click="onClickCheckout"
      />
    </div>
  </div>
</template>
