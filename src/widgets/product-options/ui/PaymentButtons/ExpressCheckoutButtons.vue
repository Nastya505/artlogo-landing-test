<script setup lang="ts">
import { api } from '@/shared/api';

import * as Sentry from '@sentry/browser';
import { loadStripe } from '@stripe/stripe-js';

import { ElLoading, ElMessage } from 'element-plus';
import { onMounted, ref, watch } from 'vue';

export interface LineItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
  properties?: Record<string, string | undefined>;
}

const props = defineProps<{
  disabled?: boolean;
  amount: number;
  lineItems: LineItem[];
}>();
defineEmits<{
  click: [];
}>();

const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const elements = ref(stripe?.elements({
  mode: 'payment',
  currency: window.Shopify.currency.active.toLowerCase(),
  amount: props.amount,
  appearance: {
    variables: {
      borderRadius: '9999px',
    },
  },
}));

const expressCheckoutRef = ref<HTMLDivElement>();
onMounted(() => {
  if (elements.value && expressCheckoutRef.value) {
    const expressCheckoutElement = elements.value.create('expressCheckout', {
      buttonHeight: 55,
    });
    expressCheckoutElement.mount(expressCheckoutRef.value);

    expressCheckoutElement.on('click', (event) => {
      event.resolve({
        emailRequired: true,
        billingAddressRequired: false,
        business: {
          name: 'Artlogo',
        },
        lineItems: props.lineItems.map(lineItem => ({
          name: lineItem.title,
          amount: lineItem.price,
        })),
      });
    });

    expressCheckoutElement.on('confirm', async (event) => {
      async function confirmPayment() {
        const { error: submitError } = await elements.value!.submit();

        const email = event.billingDetails?.email;
        if (!email) {
          ElMessage.error({ message: 'Email is required for payment' });
          Sentry.captureException(new Error('Email is required for payment'));
          return;
        }

        if (submitError) {
          if (submitError.message) {
            ElMessage.error({ message: submitError.message });
          }
          Sentry.captureException(submitError);
          return;
        }

        const { data: draftOrder, error: draftOrderError } = await api.billing.POST('/draft-orders/v1', {
          body: {
            customer_email: email,
            country_code: window.Shopify.country,
            payment_mode: 'payment_intent',
            line_items: props.lineItems.map(lineItem => ({
              variant_id: lineItem.id,
              quantity: lineItem.quantity,
              custom_attributes: Object.entries(lineItem.properties ?? {})
                .filter(([_, value]) => value)
                .map(([key, value]) => ({
                  key,
                  value: value!,
                })),
            })),
          },
        });

        if (draftOrderError) {
          const draftOrderErrorObj = getPlainObject(draftOrderError?.detail);
          switch (draftOrderErrorObj?.code) {
            case 'INVALID_EMAIL_DOMAIN':
              ElMessage.error({ message: 'Email domain is invalid, please use a valid email address' });
              return;
            default:
              Sentry.captureException(draftOrderError);
              ElMessage.error({ message: 'Please try again' });
              return;
          }
        }

        if (!draftOrder?.payment_intent) {
          ElMessage.error({ message: 'Please try again' });
          Sentry.captureException(new Error('No payment intent returned by API'), {
            extra: { draftOrder },
          });
          return;
        }

        const { error } = await stripe!.confirmPayment({
          // `elements` instance used to create the Express Checkout Element
          elements: elements.value!,
          // `clientSecret` from the created PaymentIntent
          clientSecret: draftOrder.payment_intent.client_secret,
          confirmParams: {
            return_url: draftOrder.payment_intent.return_url,
          },
        });

        if (error) {
          if (error.message) {
            ElMessage.error({ message: error.message });
          }
          Sentry.captureException(error, {
            extra: { draftOrder },
          });
        }
      }

      const loader = ElLoading.service({
        text: 'Completing your order...',
        lock: true,
      });
      try {
        await confirmPayment();
      } catch (error) {
        Sentry.captureException(error, {
          extra: { event },
        });
        ElMessage.error({ message: 'Something went wrong, please try again' });
      } finally {
        loader.close();
      }
    });
  }
});

watch(
  () => props.amount,
  () => elements.value?.update({
    amount: props.amount,
  }),
);
</script>

<template>
  <div
    ref="expressCheckoutRef"
    :class="{
      '*:!pointer-events-none cursor-pointer': props.disabled,
    }"
    @click="$emit('click')"
  />
</template>
