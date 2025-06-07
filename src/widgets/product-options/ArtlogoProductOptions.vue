<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ProductOptionsApp from './App.vue';
import { initializeCurrency } from './lib/currency-provider';
import { initializeArtlogoProduct } from './lib/product-data-provider';
import { useOptionsStore } from './model/OptionsStore';

interface Props {
  productHandle?: string;
  currency?: string;
}

const props = withDefaults(defineProps<Props>(), {
  productHandle: 'signature-logo',
  currency: 'USD',
});

const isLoading = ref(false);
const isInitialized = ref(false);
const error = ref<string | null>(null);

async function initializeProduct() {
  isLoading.value = true;
  error.value = null;

  try {
    // Initialize currency
    initializeCurrency(props.currency);

    // Fetch and initialize product data
    await initializeArtlogoProduct(props.productHandle);

    // Initialize the options store with the loaded data
    const optionsStore = useOptionsStore();
    await optionsStore.initializeSection();

    isInitialized.value = true;
  } catch (err) {
    console.error('Failed to initialize product:', err);
    error.value = err instanceof Error ? err.message : 'Unknown error occurred';
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  initializeProduct();
});
</script>

<template>
  <div class="artlogo-product-options">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      <span class="ml-2">Loading product options...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
      <h3 class="font-semibold">
        Error loading product
      </h3>
      <p>{{ error }}</p>
      <button
        class="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        @click="initializeProduct"
      >
        Retry
      </button>
    </div>

    <!-- Product Options Component -->
    <ProductOptionsApp v-else-if="isInitialized" />
  </div>
</template>

<style scoped>

</style>
