import { computed, ref } from 'vue';

// Global currency state
const currentCurrency = ref('USD');
const currencySymbol = ref('$');

// Currency configuration
const currencyConfig = {
  USD: { symbol: '$', format: 'before', decimals: 2 },
  EUR: { symbol: '€', format: 'after', decimals: 2 },
  GBP: { symbol: '£', format: 'before', decimals: 2 },
  CAD: { symbol: 'C$', format: 'before', decimals: 2 },
  AUD: { symbol: 'A$', format: 'before', decimals: 2 },
};

/**
 * Initialize currency (default USD)
 */
export function initializeCurrency(currency: string = 'USD'): void {
  setCurrency(currency);
}

/**
 * Set current currency
 */
export function setCurrency(currency: string): void {
  if (currencyConfig[currency as keyof typeof currencyConfig]) {
    currentCurrency.value = currency;
    currencySymbol.value = currencyConfig[currency as keyof typeof currencyConfig].symbol;
  }
}

/**
 * Format price in cents to currency string
 */
export function formatPrice(priceInCents: number, currency?: string): string {
  const curr = currency || currentCurrency.value;
  const config = currencyConfig[curr as keyof typeof currencyConfig] || currencyConfig.USD;

  const price = priceInCents / 100;
  const formattedPrice = price.toFixed(config.decimals);

  if (config.format === 'before') {
    return `${config.symbol}${formattedPrice}`;
  } else {
    return `${formattedPrice}${config.symbol}`;
  }
}

/**
 * Parse price string to cents
 */
export function parsePrice(priceString: string): number {
  const cleanPrice = priceString.replace(/[^\d.,]/g, '');
  const price = Number.parseFloat(cleanPrice.replace(',', '.'));
  return Math.round(price * 100);
}

/**
 * Composable for currency operations
 */
export function useCurrency() {
  const Shopify = computed(() => ({
    currency: {
      active: currentCurrency.value,
      rate: 1, // Always 1 for base currency
    },
    formatMoney: (priceInCents: number) => formatPrice(priceInCents),
    shop: {
      currency: currentCurrency.value,
    },
  }));

  return {
    Shopify,
    setCurrency,
    formatPrice,
    parsePrice,
    currentCurrency: computed(() => currentCurrency.value),
    currencySymbol: computed(() => currencySymbol.value),
  };
}

/**
 * Mock Shopify object for compatibility
 */
export const ShopifyMock = computed(() => ({
  currency: {
    active: currentCurrency.value,
    rate: 1,
  },
  formatMoney: (priceInCents: number) => formatPrice(priceInCents),
  shop: {
    currency: currentCurrency.value,
  },
}));
