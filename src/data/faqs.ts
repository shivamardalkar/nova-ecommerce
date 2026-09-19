import type { FAQ } from '@/types';

export const mockFAQs: FAQ[] = [
  {
    id: 'faq-001',
    question: 'How can I place an order?',
    answer:
      'Add the products you want to your cart, continue to checkout, provide your shipping information, select a payment method, and review your order before placing it.',
    category: 'Orders',
    active: true,
  },
  {
    id: 'faq-002',
    question: 'Can I modify my cart quantity?',
    answer:
      'Yes. You can increase or decrease the quantity of an item directly from the shopping cart.',
    category: 'Cart',
    active: true,
  },
  {
    id: 'faq-003',
    question: 'How do I apply a coupon?',
    answer:
      'Enter a valid coupon code in the coupon field on the cart page and apply it. Eligible discounts will be reflected in the order total.',
    category: 'Payments',
    active: true,
  },
  {
    id: 'faq-004',
    question: 'Can I save products for later?',
    answer:
      'Yes. Authenticated customers can add products to their wishlist and move wishlist products to the cart later.',
    category: 'Wishlist',
    active: true,
  },
  {
    id: 'faq-005',
    question: 'How can I contact customer support?',
    answer:
      'Use the Customer Support form to submit your name, email, subject, and message. The submission is stored locally in this frontend assessment.',
    category: 'Support',
    active: true,
  },
  {
    id: 'faq-006',
    question: 'Can I return a product?',
    answer:
      'Return information will be presented in the product shipping and returns section. This assessment uses simulated order functionality.',
    category: 'Orders',
    active: true,
  },
  {
    id: 'faq-007',
    question: 'Is payment processed using a real payment gateway?',
    answer:
      'No. Payment is simulated because this assessment is a frontend-only application.',
    category: 'Payments',
    active: true,
  },
  {
    id: 'faq-008',
    question: 'Does the application save my cart?',
    answer:
      'Yes. The application will persist relevant customer data such as the cart using browser Local Storage.',
    category: 'Cart',
    active: true,
  },
];