// Landing page configuration data
export interface Step {
  id: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: 'left' | 'right';
}

export interface Feature {
  icon: string;
  iconAlt: string;
  title: string;
}

export const LANDING_STEPS: Step[] = [
  {
    id: 1,
    title: 'Place Your Order',
    description: 'Choose your preferred signature style and share any special requests. It takes just 2 minutes!',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-step-1.webp?v=1749010856',
    imageAlt: 'Choose your signature style',
    imagePosition: 'left',
  },
  {
    id: 2,
    title: 'We Create Your Design',
    description: 'Our professional calligraphers handcraft your signature or logo within 24-48 hours.',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-step-2.webp?v=1749010868',
    imageAlt: 'We create your design',
    imagePosition: 'right',
  },
  {
    id: 3,
    title: 'Approve & Use',
    description: 'Review the result, request free revisions if needed, and download your final design. Ready to impress!',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-step-3.webp?v=1749010877',
    imageAlt: 'Review the result',
    imagePosition: 'left',
  },
];

export const LANDING_FEATURES: Feature[] = [
  {
    icon: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/icon-heart.webp?v=1748964830',
    iconAlt: 'Trusted by customers',
    title: 'Trusted by Over\n100,000 Customers',
  },
  {
    icon: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/icon-time.webp?v=1748964879',
    iconAlt: 'Fast delivery',
    title: 'Preview Ready\nin 1-2 Days',
  },
  {
    icon: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/icon-successfully.webp?v=1748964943',
    iconAlt: 'Free revisions',
    title: 'Unlimited Free\nRevisions Guaranteed',
  },
  {
    icon: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/icon-tree.webp?v=1748964861',
    iconAlt: 'Lifetime value',
    title: 'One-time Investment,\nLifetime Value',
  },
];

export const PAY_METHODS = [
  'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-amex.png?v=1686768256',
  'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-apple_pay.png?v=1686768256',
  'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-diners_club.png?v=1686768536',
  'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-discover.png?v=1686768256',
  'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-google_pay.png?v=1686768256',
  'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-maestro.png?v=1686768256',
  'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-mastercard.png?v=1686768256',
  'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-paypal.png?v=1686768256',
  'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-shop_pay.png?v=1686768256',
  'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-unionpay.png?v=1686768257',
  'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/payment_method-visa.png?v=1686768256',
];

interface Review {
  id: number;
  name: string;
  title: string;
  rating: number;
  date: string;
  text: string;
  image: string;
}

export const LANDING_REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Federico Phelps Corasoli',
    title: 'Business Owner',
    rating: 5,
    date: 'Apr 4, 2023',
    text: 'I would like to express my sincere gratitude to Artlogo for creating the perfect and sleek logo for me. They worked quickly and with precision, ensuring that every detail was taken care of.\n\nFrom start to finish, Artlogo was professional and easy to work with. They took the time to understand my vision and provided valuable input to help bring it to life. Their expertise and attention to detail truly shone through in the final product.\n\nI am absolutely thrilled with my new logo and have received many compliments on it. It has added a professional and polished touch to my brand, and I couldn\'t be happier with the outcome.\n\nThank you, Artlogo, for your exceptional work and dedication. I would highly recommend their services to anyone looking for a high-quality and stunning logo design.',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/artlogo-landing-review-1.webp?v=1749045282',
  },
  {
    id: 2,
    name: 'Jackson Wright',
    title: 'Lawyer',
    rating: 5,
    date: 'Mar 15, 2023',
    text: 'Outstanding service from Artlogo! The team delivered exactly what I was looking for - a professional signature that represents my brand perfectly.\n\nThe process was smooth and efficient. They understood my requirements from the first consultation and provided multiple options to choose from. The final result exceeded my expectations.\n\nI\'ve been using my new signature for all business communications and have received numerous positive comments from clients and colleagues. It has definitely enhanced my professional image.\n\nHighly recommend Artlogo for anyone looking to elevate their brand with a custom signature design.',
    image: 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/SignatureConcept09.webp?v=1741967575',
  },
];// SEO configuration
export const LANDING_SEO = {
  title: 'Artlogo - Professional Logo Design & Digital Signatures',
  description: 'Create stunning professional logos and digital signatures. Multipurpose design that represents you perfectly. Used by thousands of professionals worldwide.',
  ogImage: '/images/artlogo-hero.jpg',
};
