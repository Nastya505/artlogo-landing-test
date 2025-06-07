import type { ProductOptionsSection } from '../model/types';

// Global product data state
let productData: ProductOptionsSection | null = null;

/**
 * Fetch product data from artlogo.co API
 */
export async function fetchArtlogoProduct(productHandle: string = 'signature-logo'): Promise<ProductOptionsSection> {
  try {
    const response = await fetch(`https://artlogo.co/products/${productHandle}.js`);
    const artlogoProduct = await response.json();

    // Transform artlogo product data to our format
    const transformedProduct: ProductOptionsSection = {
      product: {
        id: artlogoProduct.id,
        title: artlogoProduct.title,
        handle: artlogoProduct.handle,
        description: artlogoProduct.description.replace(/\\u003c\\/g, '</').replace(/\\u003e/g, '>'), // Clean HTML entities
        vendor: artlogoProduct.vendor,
        type: artlogoProduct.type,
        price: artlogoProduct.price,
        price_min: artlogoProduct.price_min,
        price_max: artlogoProduct.price_max,
        available: artlogoProduct.available,
        price_varies: artlogoProduct.price_varies,
        compare_at_price: artlogoProduct.compare_at_price,
        compare_at_price_min: artlogoProduct.compare_at_price_min,
        compare_at_price_max: artlogoProduct.compare_at_price_max,
        compare_at_price_varies: artlogoProduct.compare_at_price_varies,
        variants: artlogoProduct.variants.map((variant: any) => ({
          id: variant.id,
          title: variant.title,
          option1: variant.option1,
          option2: variant.option2,
          option3: variant.option3,
          sku: variant.sku,
          requires_shipping: variant.requires_shipping,
          taxable: variant.taxable,
          featured_image: variant.featured_image,
          available: variant.available,
          name: variant.name,
          public_title: variant.public_title,
          options: variant.options,
          price: variant.price,
          weight: variant.weight,
          compare_at_price: variant.compare_at_price,
          inventory_management: variant.inventory_management,
          barcode: variant.barcode,
          requires_selling_plan: variant.requires_selling_plan,
          selling_plan_allocations: variant.selling_plan_allocations,
        })),
        images: artlogoProduct.images,
        featured_image: artlogoProduct.featured_image,
        options: artlogoProduct.options,
        url: artlogoProduct.url,
        media: artlogoProduct.media,
        requires_selling_plan: artlogoProduct.requires_selling_plan,
        selling_plan_groups: artlogoProduct.selling_plan_groups,
      },
      showPadding: true,
      showBackgroundColor: false,
      backgroundColor: '#ffffff',
      heading: 'Create Your Signature Logo',
      currency_message_mode: 'dollars',
      optionsSet: [
        // Artist Selection (based on variants)
        {
          type: 'radio',
          cart_label: 'artist_level',
          send_value_to_cart: true,
          show_background_color: false,
          background_color: '',
          is_required: true,
          url_param_key: 'artist',
          options: artlogoProduct.variants.map((variant: any) => variant.title),
          add_product_condition: null,
          product_variant_id: null,
          product_price: 0,
          product_compare_at_price: 0,
          product_title: '',
        },
        // Name Input
        {
          type: 'text_input',
          product_label: 'What would you like your Signature Logo to say?',
          cart_label: 'signature_name',
          send_value_to_cart: true,
          show_background_color: false,
          background_color: '',
          is_required: true,
          url_param_key: 'name',
          placeholder_text: 'Enter the text for your signature here',
          character_limit: 50,
          validation_type: '',
        },
        {
          type: 'text_input',
          product_label: 'Add a tagline (if you\'d like)',
          cart_label: 'special_instructions',
          send_value_to_cart: true,
          show_background_color: false,
          background_color: '',
          is_required: false,
          url_param_key: 'instructions',
          placeholder_text: 'Enter your slogan (optional)',
          character_limit: 200,
          validation_type: '',
        },
        // Additional Services
        {
          type: 'swatches',
          cart_label: 'liked_signature_styles',
          send_value_to_cart: true,
          show_background_color: false,
          background_color: '',
          is_required: false,
          url_param_key: 'style',
          options: [
            { background: 'https://cloud.artlogo.co/direct/signature-styles/55A.webp', value: '55A' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/02E.webp', value: '02E' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/79F.webp', value: '79F' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/03.webp', value: '03' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/04.webp', value: '04' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/05A.webp', value: '05A' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/92G.webp', value: '92G' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/128V.webp', value: '128V' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/06F.webp', value: '06F' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/07A.webp', value: '07A' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/08K.webp', value: '08K' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/45E.webp', value: '45E' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/87K.webp', value: '87K' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/118W.webp', value: '118W' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/07L.webp', value: '07L' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/12E.webp', value: '12E' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/82P.webp', value: '82P' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/13-1L.webp', value: '13-1L' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/14A.webp', value: '14A' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/15.webp', value: '15' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/22A.webp', value: '22A' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/16.webp', value: '16' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/95G.webp', value: '95G' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/18L.webp', value: '18L' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/139T.webp', value: '139T' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/20.webp', value: '20' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/21.webp', value: '21' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/20L.webp', value: '20L' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/111T.webp', value: '111T' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/102V.webp', value: '102V' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/114T.webp', value: '114T' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/26E.webp', value: '26E' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/138L.webp', value: '138L' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/140J.webp', value: '140J' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/76W.webp', value: '76W' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/11W.webp', value: '11W' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/33L.webp', value: '33L' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/33Q.webp', value: '33Q' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/145T.webp', value: '145T' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/142J.webp', value: '142J' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/52E.webp', value: '52E' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/56K.webp', value: '56K' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/146T.webp', value: '146T' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/109T.webp', value: '109T' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/94G.webp', value: '94G' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/141T.webp', value: '141T' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/143L.webp', value: '143L' },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/147J.webp', value: '147J' },
          ],
          min_selections: 0,
          max_selections: 4,
          desktop_paginate_by: 24,
          mobile_paginate_by: 12,
          paginate_button_text: 'Show more styles',
          show_all_after_first_pagination: false,
        },
        {
          type: 'checkboxes',
          product_label: 'Additional Services (Optional)',
          cart_label: 'additional_services',
          send_value_to_cart: true,
          tooltip: 'Optional extras to enhance your order',
          show_background_color: false,
          background_color: '',
          is_required: false,
          url_param_key: 'extras',
          options: [
            'Rush Delivery (+$20)',
            'Source Files (+$15)',
            'Multiple Variations (+$10)',
            'Commercial License (+$25)',
          ],
          min_selections: 0,
          max_selections: 4,
        },
        // File Upload for Reference
        {
          type: 'file_uploader',
          product_label: 'Upload Reference (Optional)',
          cart_label: 'reference_file',
          send_value_to_cart: true,
          tooltip: 'Upload a reference image or existing signature style',
          show_background_color: false,
          background_color: '',
          is_required: false,
          url_param_key: '',
          label: 'Upload Reference',
          accept: 'image/*,.pdf',
        },
        // Additional Comments Section

      ],
    };

    return transformedProduct;
  } catch (error) {
    console.error('Error fetching artlogo product:', error);
    throw new Error(`Failed to fetch product data: ${error}`);
  }
}

/**
 * Set product data manually
 */
export function setProductData(data: ProductOptionsSection): void {
  productData = data;
}

/**
 * Get current product data (fallback to default if none set)
 */
export function getProductData(): ProductOptionsSection {
  if (!productData) {
    throw new Error('Product data not initialized. Call fetchArtlogoProduct() or setProductData() first.');
  }
  return productData;
}

/**
 * Initialize product data from artlogo.co
 */
export async function initializeArtlogoProduct(productHandle?: string): Promise<void> {
  const data = await fetchArtlogoProduct(productHandle);
  setProductData(data);
}

/**
 * Get variant by selection
 */
export function getVariantBySelection(artistLevel: string): any {
  const product = getProductData().product;
  return product.variants.find((variant: any) => variant.title === artistLevel) || product.variants[0];
}

/**
 * Calculate price with extras
 */
export function calculateTotalPrice(artistLevel: string, additionalServices: string[] = []): number {
  const variant = getVariantBySelection(artistLevel);
  let totalPrice = variant.price;

  // Add prices for additional services
  additionalServices.forEach((service) => {
    if (service.includes('+$20')) {
      totalPrice += 2000; // Rush Delivery
    }
    if (service.includes('+$15')) {
      totalPrice += 1500; // Source Files
    }
    if (service.includes('+$10')) {
      totalPrice += 1000; // Multiple Variations
    }
    if (service.includes('+$25')) {
      totalPrice += 2500; // Commercial License
    }
  });

  return totalPrice;
}
