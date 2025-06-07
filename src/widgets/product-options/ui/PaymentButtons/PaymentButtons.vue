<script setup lang="ts">
import type { OptionBase } from '../../model/types';

// import { checkoutProviders } from '@/features/checkout';
import * as Sentry from '@sentry/browser';
import { ElMessage } from 'element-plus';

import { computed, defineAsyncComponent, ref } from 'vue';

import { z } from 'zod';
import { useOptionsStore } from '../../model/OptionsStore';

export interface PaymentButtonsOption extends OptionBase {
  type: 'payment_buttons';
  enable_express_checkout: boolean;
  button_text: string;
  go_after_click: 'cart' | 'checkout';
  checkout_provider: 'shopify' | 'stripe';
}

const props = defineProps<{ option: PaymentButtonsOption }>();

// const ExpressCheckoutButtons = defineAsyncComponent(() => import('@/features/checkout/ui/ExpressCheckoutButtons.vue'));

const optionsStore = useOptionsStore();

const isLoading = ref(false);
const acceptTermsAndConditions = ref(true);

const isValid = computed(() => acceptTermsAndConditions.value && optionsStore.validateAllOptions());
function checkIfReadyAndShowErrors() {
  if (!isValid.value) {
    // check if all options are valid
    if (!optionsStore.validateAllOptions()) {
      const firstOptionWithError = optionsStore.section.optionsSet.find(option => optionsStore.errors[option.cart_label])!;
      document.querySelector(`[data-cart-label="${firstOptionWithError.cart_label}"]`)?.scrollIntoView({
        behavior: 'smooth',
      });
      ElMessage.error({
        message: 'Some fields are not filled in correctly',
      });
      return false;
    }

    // check if T&C are accepted
    if (!acceptTermsAndConditions.value) {
      ElMessage.error({
        message: 'Please accept the Terms and Conditions',
      });
      return false;
    }
  }

  return true;
}

function getEmailIfExists() {
  const emailOption = optionsStore.section.optionsSet.find(option => option.type === 'text_input' && option.validation_type === 'email');
  const emailOptionCartLabel = emailOption?.cart_label;

  const emailRaw = (emailOptionCartLabel && optionsStore.mainProduct.customParams[emailOptionCartLabel]) || window.Shopify?.customer?.email;
  if (emailRaw) {
    const { success: isValid } = z.string().email().safeParse(emailRaw);
    if (isValid) {
      return emailRaw;
    }
  }
}

async function onClickCheckout() {
  const isReady = checkIfReadyAndShowErrors();
  if (!isReady) {
    return;
  }

  // disable button
  isLoading.value = true;

  const email = getEmailIfExists();

  // disabled in https://github.com/artlogo-co/artlogo/issues/2846
  // if (email) {
  //   api.public.POST('/klaviyo/v1/subscribe-to-list', {
  //     body: {
  //       list_id: 'WP76HF',
  //       email,
  //     },
  //   });
  // }

  try {
    if (props.option.go_after_click === 'checkout') {
      const { data: checkoutSession, error } = await checkoutProviders[props.option.checkout_provider].createSession({
        lineItems: optionsStore.lineItems,
        email,
      });

      if (error) {
        ElMessage.error({ message: error.message });
        return;
      }

      window.location.href = checkoutSession.url;
    } else {
      // in this case we need to redirect to the cart page, not to the checkout
      // this is only supported by Shopify checkout provider
      const { error } = await checkoutProviders.shopify.createSession({
        lineItems: optionsStore.lineItems,
        email,
      });

      if (error) {
        ElMessage.error({ message: error.message });
        return;
      }

      window.location.href = '/cart';
    }
  } catch (e) {
    Sentry.captureException(e, { level: 'fatal' });
    ElMessage.error({
      message: props.option.go_after_click === 'checkout' ? 'Failed to create a Checkout session. Please try again.' : 'Could not add to cart. Please try again.',
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col items-center">
      <div class="flex items-center justify-center gap-4">
        <input
          id="accept-terms-conditions" v-model="acceptTermsAndConditions" type="checkbox" name="Terms & Conditions"
          class="
          w-8 h-8 cursor-pointer inline-block relative appearance-none shrink-0
          before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border-2 before:border-solid before:rounded-md before:border-gray-300
          checked:before:bg-accent-green checked:before:border-accent-green
          after:content-[''] after:absolute after:top-2 after:left-3 after:w-2 after:h-4 after:border-solid after:border-white after:border-t-0 after:border-l-0 after:border-r-2 after:border-b-2 after:rotate-45
          "
        >
        <label for="accept-terms-conditions" class="cursor-pointer md:text-2xl inline-block text-center">
          I accept and agree to the <a href="/policies/terms-of-service" target="_blank" class="text-accent-green">Terms and Conditions</a>
        </label>
      </div>

      <div v-if="!acceptTermsAndConditions" class="mt-3 text-base text-center text-danger-red">
        You need to accept the Terms and Conditions above to continue with your order.
      </div>
    </div>
    <div class="max-w-xl mx-auto space-y-6">
      <button class="button button--primary w-full py-4 md:py-8 text-2xl md:text-4xl" :disabled="isLoading" @click="onClickCheckout">
        {{ props.option.button_text }}
        <span v-show="isLoading" class="vuc-preloader ml-4" />
      </button>

      <Suspense v-if="props.option.enable_express_checkout">
        <ExpressCheckoutButtons
          :disabled="!isValid"
          :line-items="optionsStore.lineItems"
          :amount="optionsStore.cartTotal.price"
          @click="checkIfReadyAndShowErrors"
        />
      </Suspense>
    </div>
  </div>
</template>
