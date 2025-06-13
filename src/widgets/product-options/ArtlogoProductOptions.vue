<script setup lang="ts">
import { defineEmits, onMounted, ref } from 'vue';
import ProductOptionsApp from './App.vue';
import { initializeArtlogoProduct } from './lib/product-data-provider';
import { useOptionsStore } from './model/OptionsStore';

interface Props {
  productHandle?: string;
  currency?: string;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  productHandle: 'signature-logo',
  currency: 'USD',
  isLoading: false,
});

const emit = defineEmits(['initialized']);

const isInitialized = ref(false);
const error = ref<string | null>(null);

async function initializeProduct() {
  error.value = null;
  try {
    await initializeArtlogoProduct(props.productHandle);
    const optionsStore = useOptionsStore();
    await optionsStore.initializeSection();
    isInitialized.value = true;
    emit('initialized');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred';
  }
}

onMounted(() => {
  initializeProduct();
});
</script>

<template>
  <div>
    <ProductOptionsApp v-if="isInitialized" />
  </div>
</template>
