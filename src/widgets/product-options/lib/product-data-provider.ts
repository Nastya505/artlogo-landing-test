import type { ProductOptionsSection } from '../model/types';

// Global product data state
let productData: ProductOptionsSection | null = null;

/**
 * Fetch product data from artlogo.co API
 */
export async function fetchArtlogoProduct(productHandle: string = 'signature-logo'): Promise<ProductOptionsSection> {
  try {
    const response = await fetch(`https://artlogo.co/products/${productHandle}.js?currency=USD`);
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
        // {
        //   type: 'radio',
        //   cart_label: 'artist_level',
        //   send_value_to_cart: true,
        //   show_background_color: false,
        //   background_color: '',
        //   is_required: true,
        //   url_param_key: 'artist',
        //   options: artlogoProduct.variants.map((variant: any) => variant.title),
        //   add_product_condition: null,
        //   product_variant_id: null,
        //   product_price: 0,
        //   product_compare_at_price: 0,
        //   product_title: '',
        // },
        {
          type: 'variant_selector',
          title: 'Choose your Artlogo® Artist',
          cart_label: 'variant_selector',
          send_value_to_cart: false,
          badges: ['Basic', 'Most popular', 'Premium'],
          variants: artlogoProduct.variants,
          default_variant_index: 1,
          show_inventory_quantity: true,
          sale_name: '',
          show_background_color: false,
          background_color: '#f6f6f6',
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
            { background: 'https://cloud.artlogo.co/direct/signature-styles/55A.webp', value: '55A', is_popular: true },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/02E.webp', value: '02E', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/79F.webp', value: '79F', is_popular: true },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/03.webp', value: '03', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/04.webp', value: '04', is_popular: true },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/05A.webp', value: '05A', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/92G.webp', value: '92G', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/128V.webp', value: '128V', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/06F.webp', value: '06F', is_popular: true },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/07A.webp', value: '07A', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/08K.webp', value: '08K', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/45E.webp', value: '45E', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/87K.webp', value: '87K', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/118W.webp', value: '118W', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/07L.webp', value: '07L', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/12E.webp', value: '12E', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/82P.webp', value: '82P', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/13-1L.webp', value: '13-1L', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/14A.webp', value: '14A', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/15.webp', value: '15', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/22A.webp', value: '22A', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/16.webp', value: '16', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/95G.webp', value: '95G', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/18L.webp', value: '18L', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/139T.webp', value: '139T', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/20.webp', value: '20', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/21.webp', value: '21', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/20L.webp', value: '20L', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/111T.webp', value: '111T', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/102V.webp', value: '102V', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/114T.webp', value: '114T', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/26E.webp', value: '26E', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/138L.webp', value: '138L', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/140J.webp', value: '140J', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/76W.webp', value: '76W', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/11W.webp', value: '11W', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/33L.webp', value: '33L', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/33Q.webp', value: '33Q', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/145T.webp', value: '145T', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/142J.webp', value: '142J', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/52E.webp', value: '52E', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/56K.webp', value: '56K', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/146T.webp', value: '146T', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/109T.webp', value: '109T', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/94G.webp', value: '94G', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/141T.webp', value: '141T', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/143L.webp', value: '143L', is_popular: false },
            { background: 'https://cloud.artlogo.co/direct/signature-styles/147J.webp', value: '147J', is_popular: false },
          ],
          min_selections: 0,
          max_selections: 4,
          desktop_paginate_by: 12,
          mobile_paginate_by: 12,
          paginate_button_text: 'Show more styles',
          show_all_after_first_pagination: false,
        },
        // File Upload for Reference
        {
          type: 'file_uploader',
          cart_label: 'reference_file',
          send_value_to_cart: true,
          show_background_color: false,
          background_color: '',
          is_required: false,
          url_param_key: '',
          label: 'Upload Reference',
          accept: 'image/*,.pdf,.png,.jpg,.jpeg,.gif,.webp,.svg',
        },
        {
          type: 'product_switch',
          product_label: 'Add Elite Signature Bundle – 6 Luxe Designs',
          cart_label: 'elite_signature_bundle',
          product_description: 'A versatile set of 6 signature styles to elevate your branding: Animated, Stamp, Watermark, Profile Picture, Initials, and Blue Ink editions. Perfect for logos, watermarks, social profiles, and more.',
          product_image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/AddEliteSignatureBundle.webp?v=1749536986',
          product_price: 5995,
          product_compare_at_price: 24995,
          active_by_default: false,
        },
        {
          type: 'product_switch',
          product_label: 'Add All formats Signature Logo Pack (.ai .eps .pdf .jpg .svg)',
          cart_label: 'all_formats_logo_pack',
          product_description: 'Receive your signature with the source/vector files. Perfect for using it for all purposes including editing the signature or large scale printing without losing the quality',
          product_image: 'https://artlogo.co/cdn/shop/products/1_47e1dc09-c2bb-4862-9f17-af227a24e9ad.jpg?v=1741174166&width=200',
          product_price: 3495,
          product_compare_at_price: 4995,
          active_by_default: true,
        },
        {
          type: 'product_switch',
          product_label: 'Add Signature Learning Pack (PDF stencil to print + video)',
          cart_label: 'signature_learning_pack',
          product_description: 'Learn to sign your new signature with these effective materials (signature guide + video tutorial) with just 15 minutes of practice.',
          product_image: 'https://artlogo.co/cdn/shop/products/learning_pack.jpg?v=1739963541&width=200',
          product_price: 2495,
          product_compare_at_price: 3995,
          active_by_default: true,
        },
        {
          type: 'product_switch',
          product_label: 'Add Signature Initials',
          cart_label: 'signature_initials',
          product_description: 'Include your signature in short-form version using your initials. Perfect for quick signing, as square format logo, favicon, profile pic and more',
          product_image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/AddSignatureInitials.webp?v=1749537012',
          product_price: 3495,
          product_compare_at_price: 3495,
          active_by_default: true,
        },
        {
          type: 'product_switch',
          product_label: 'Add Logo Elements to the Signature',
          cart_label: 'logo_elements',
          product_description: 'Make your signature more unique by incorporating a graphical line art on it. Logo Element can be anything related to your career, industry or symbolises you (see examples)',
          product_image: 'https://artlogo.co/cdn/shop/products/UmbrellaSignature_4806ef9e-07c2-4c6f-b8e0-8ce1d4796132.png?v=1650381226&width=200',
          product_price: 3995,
          product_compare_at_price: 5995,
          active_by_default: false,
        },
        {
          type: 'product_switch',
          product_label: 'Add Fast & Safe Signature Pack',
          cart_label: 'fast_safe_pack',
          product_description: 'Get your signature fast with priority delivery (1-3 business days) and lifetime storage for unlimited access. If it\'s ever lost, we\'ll redesign it for free. One-time payment, lifetime benefits!',
          product_image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/AddFastSafeSignaturePack.webp?v=1749536956',
          product_price: 495,
          product_compare_at_price: 995,
          active_by_default: false,
        },
        // Cart Total (итоговая сумма)
        {
          type: 'cart_total',
          cart_label: 'cart_total',
          product_label: 'Total',
          send_value_to_cart: false,
          show_background_color: false,
          background_color: '',
          is_required: false,
          url_param_key: '',
        },
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
