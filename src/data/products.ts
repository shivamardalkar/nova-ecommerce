import type { Product } from '@/types';

const createProduct = (
  product: Omit<Product, 'createdAt' | 'updatedAt' | 'reviews'>,
): Product => ({
  ...product,
  reviews: [],
  createdAt: '2026-01-10T10:00:00.000Z',
  updatedAt: '2026-01-10T10:00:00.000Z',
});

export const mockProducts: Product[] = [
  createProduct({
    id: 'product-001',
    name: 'Apex X1 Pro Smartphone',
    brandId: 'brand-001',
    categoryId: 'category-001',
    description:
      'A premium smartphone featuring a high-resolution display, powerful processor, and advanced camera system.',
    price: 64999,
    originalPrice: 69999,
    discountPercentage: 7,
    stock: 18,
    images: [
      'https://placehold.co/800x800?text=Apex+X1+Pro',
      'https://placehold.co/800x800?text=Apex+X1+Display',
      'https://placehold.co/800x800?text=Apex+X1+Camera',
    ],
    specifications: [
      { key: 'Display', value: '6.7-inch AMOLED' },
      { key: 'Processor', value: 'Octa-core flagship processor' },
      { key: 'RAM', value: '12 GB' },
      { key: 'Storage', value: '256 GB' },
      { key: 'Camera', value: '50 MP triple camera' },
      { key: 'Battery', value: '5000 mAh' },
    ],
    rating: 4.7,
    status: 'active',
    featured: true,
  }),

  createProduct({
    id: 'product-002',
    name: 'Vertex V30 Smartphone',
    brandId: 'brand-002',
    categoryId: 'category-001',
    description:
      'Balanced smartphone with a bright display, capable camera system, and all-day battery life.',
    price: 42999,
    originalPrice: 45999,
    discountPercentage: 7,
    stock: 24,
    images: [
      'https://placehold.co/800x800?text=Vertex+V30',
      'https://placehold.co/800x800?text=Vertex+V30+Back',
    ],
    specifications: [
      { key: 'Display', value: '6.5-inch OLED' },
      { key: 'RAM', value: '8 GB' },
      { key: 'Storage', value: '256 GB' },
      { key: 'Camera', value: '50 MP dual camera' },
      { key: 'Battery', value: '4800 mAh' },
    ],
    rating: 4.5,
    status: 'active',
    featured: true,
  }),

  createProduct({
    id: 'product-003',
    name: 'Lumina Edge Smartphone',
    brandId: 'brand-003',
    categoryId: 'category-001',
    description:
      'Slim and stylish smartphone designed for users who value display quality and elegant design.',
    price: 35999,
    originalPrice: 39999,
    discountPercentage: 10,
    stock: 31,
    images: [
      'https://placehold.co/800x800?text=Lumina+Edge',
      'https://placehold.co/800x800?text=Lumina+Edge+Side',
    ],
    specifications: [
      { key: 'Display', value: '6.6-inch AMOLED' },
      { key: 'RAM', value: '8 GB' },
      { key: 'Storage', value: '128 GB' },
      { key: 'Camera', value: '48 MP dual camera' },
      { key: 'Battery', value: '4500 mAh' },
    ],
    rating: 4.3,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-004',
    name: 'Nexora Lite Smartphone',
    brandId: 'brand-004',
    categoryId: 'category-001',
    description:
      'Affordable smartphone with a smooth display and dependable performance for everyday use.',
    price: 19999,
    originalPrice: 21999,
    discountPercentage: 9,
    stock: 42,
    images: [
      'https://placehold.co/800x800?text=Nexora+Lite',
      'https://placehold.co/800x800?text=Nexora+Lite+Back',
    ],
    specifications: [
      { key: 'Display', value: '6.5-inch LCD' },
      { key: 'RAM', value: '6 GB' },
      { key: 'Storage', value: '128 GB' },
      { key: 'Camera', value: '50 MP dual camera' },
      { key: 'Battery', value: '5000 mAh' },
    ],
    rating: 4.1,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-005',
    name: 'Orion Ultra Laptop',
    brandId: 'brand-005',
    categoryId: 'category-002',
    description:
      'High-performance laptop designed for software development, productivity, and demanding workloads.',
    price: 89999,
    originalPrice: 94999,
    discountPercentage: 5,
    stock: 9,
    images: [
      'https://placehold.co/800x800?text=Orion+Ultra',
      'https://placehold.co/800x800?text=Orion+Ultra+Keyboard',
    ],
    specifications: [
      { key: 'Display', value: '15.6-inch 2.5K IPS' },
      { key: 'Processor', value: '12-core performance CPU' },
      { key: 'RAM', value: '16 GB' },
      { key: 'Storage', value: '1 TB SSD' },
      { key: 'Graphics', value: 'Dedicated graphics' },
    ],
    rating: 4.8,
    status: 'active',
    featured: true,
  }),

  createProduct({
    id: 'product-006',
    name: 'Apex Air Laptop',
    brandId: 'brand-001',
    categoryId: 'category-002',
    description:
      'Lightweight laptop combining portability, performance, and long battery life.',
    price: 69999,
    originalPrice: 74999,
    discountPercentage: 7,
    stock: 15,
    images: [
      'https://placehold.co/800x800?text=Apex+Air',
      'https://placehold.co/800x800?text=Apex+Air+Keyboard',
    ],
    specifications: [
      { key: 'Display', value: '14-inch IPS' },
      { key: 'Processor', value: '10-core performance CPU' },
      { key: 'RAM', value: '16 GB' },
      { key: 'Storage', value: '512 GB SSD' },
      { key: 'Battery', value: 'Up to 12 hours' },
    ],
    rating: 4.6,
    status: 'active',
    featured: true,
  }),

  createProduct({
    id: 'product-007',
    name: 'Vertex WorkBook 14',
    brandId: 'brand-002',
    categoryId: 'category-002',
    description:
      'Reliable 14-inch productivity laptop for office work, study, and everyday computing.',
    price: 54999,
    originalPrice: 59999,
    discountPercentage: 8,
    stock: 21,
    images: [
      'https://placehold.co/800x800?text=Vertex+WorkBook',
      'https://placehold.co/800x800?text=Vertex+WorkBook+Side',
    ],
    specifications: [
      { key: 'Display', value: '14-inch Full HD IPS' },
      { key: 'Processor', value: '8-core CPU' },
      { key: 'RAM', value: '16 GB' },
      { key: 'Storage', value: '512 GB SSD' },
    ],
    rating: 4.4,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-008',
    name: 'Nexora Creator Laptop',
    brandId: 'brand-004',
    categoryId: 'category-002',
    description:
      'Creator-focused laptop with a high-quality display and powerful hardware for creative workflows.',
    price: 109999,
    originalPrice: 119999,
    discountPercentage: 8,
    stock: 6,
    images: [
      'https://placehold.co/800x800?text=Nexora+Creator',
      'https://placehold.co/800x800?text=Nexora+Creator+Display',
    ],
    specifications: [
      { key: 'Display', value: '16-inch 3.2K OLED' },
      { key: 'Processor', value: '16-core performance CPU' },
      { key: 'RAM', value: '32 GB' },
      { key: 'Storage', value: '1 TB SSD' },
      { key: 'Graphics', value: 'Dedicated graphics' },
    ],
    rating: 4.9,
    status: 'active',
    featured: true,
  }),

  createProduct({
    id: 'product-009',
    name: 'Pulse Studio Headphones',
    brandId: 'brand-006',
    categoryId: 'category-003',
    description:
      'Wireless over-ear headphones with active noise cancellation and immersive sound.',
    price: 12999,
    originalPrice: 14999,
    discountPercentage: 13,
    stock: 35,
    images: [
      'https://placehold.co/800x800?text=Pulse+Studio',
      'https://placehold.co/800x800?text=Pulse+Studio+Case',
    ],
    specifications: [
      { key: 'Type', value: 'Over-ear wireless' },
      { key: 'Noise Cancellation', value: 'Active' },
      { key: 'Battery', value: 'Up to 35 hours' },
      { key: 'Connectivity', value: 'Bluetooth' },
    ],
    rating: 4.6,
    status: 'active',
    featured: true,
  }),

  createProduct({
    id: 'product-010',
    name: 'Lumina Buds Pro',
    brandId: 'brand-003',
    categoryId: 'category-003',
    description:
      'Compact wireless earbuds with clear audio, active noise cancellation, and a pocket-sized case.',
    price: 7999,
    originalPrice: 8999,
    discountPercentage: 11,
    stock: 48,
    images: [
      'https://placehold.co/800x800?text=Lumina+Buds',
      'https://placehold.co/800x800?text=Lumina+Buds+Case',
    ],
    specifications: [
      { key: 'Type', value: 'True wireless earbuds' },
      { key: 'Noise Cancellation', value: 'Active' },
      { key: 'Battery', value: 'Up to 30 hours with case' },
      { key: 'Connectivity', value: 'Bluetooth 5.x' },
    ],
    rating: 4.4,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-011',
    name: 'Orion SoundBar X',
    brandId: 'brand-005',
    categoryId: 'category-003',
    description:
      'Premium soundbar designed to improve television and movie audio with rich room-filling sound.',
    price: 18999,
    originalPrice: 21999,
    discountPercentage: 14,
    stock: 12,
    images: [
      'https://placehold.co/800x800?text=Orion+SoundBar',
      'https://placehold.co/800x800?text=Orion+SoundBar+Side',
    ],
    specifications: [
      { key: 'Channels', value: '3.1' },
      { key: 'Connectivity', value: 'HDMI ARC, Bluetooth' },
      { key: 'Output', value: '300 W' },
    ],
    rating: 4.5,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-012',
    name: 'Apex Sport Watch',
    brandId: 'brand-001',
    categoryId: 'category-004',
    description:
      'Fitness-focused smartwatch with health tracking, activity monitoring, and GPS.',
    price: 15999,
    originalPrice: 17999,
    discountPercentage: 11,
    stock: 20,
    images: [
      'https://placehold.co/800x800?text=Apex+Sport+Watch',
      'https://placehold.co/800x800?text=Apex+Sport+Watch+Side',
    ],
    specifications: [
      { key: 'Display', value: 'AMOLED' },
      { key: 'GPS', value: 'Built-in' },
      { key: 'Water Resistance', value: '5 ATM' },
      { key: 'Battery', value: 'Up to 10 days' },
    ],
    rating: 4.5,
    status: 'active',
    featured: true,
  }),

  createProduct({
    id: 'product-013',
    name: 'Vertex Active Watch',
    brandId: 'brand-002',
    categoryId: 'category-004',
    description:
      'Everyday smartwatch offering activity tracking, notifications, and long battery life.',
    price: 9999,
    originalPrice: 11999,
    discountPercentage: 17,
    stock: 27,
    images: [
      'https://placehold.co/800x800?text=Vertex+Active',
      'https://placehold.co/800x800?text=Vertex+Active+Band',
    ],
    specifications: [
      { key: 'Display', value: 'AMOLED' },
      { key: 'GPS', value: 'Connected GPS' },
      { key: 'Battery', value: 'Up to 12 days' },
      { key: 'Water Resistance', value: '5 ATM' },
    ],
    rating: 4.2,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-014',
    name: 'Pulse Fit Tracker',
    brandId: 'brand-006',
    categoryId: 'category-004',
    description:
      'Lightweight activity tracker designed for everyday steps, workouts, and sleep tracking.',
    price: 4999,
    originalPrice: 5999,
    discountPercentage: 17,
    stock: 52,
    images: [
      'https://placehold.co/800x800?text=Pulse+Fit',
      'https://placehold.co/800x800?text=Pulse+Fit+Band',
    ],
    specifications: [
      { key: 'Tracking', value: 'Activity and sleep' },
      { key: 'Battery', value: 'Up to 14 days' },
      { key: 'Water Resistance', value: '5 ATM' },
    ],
    rating: 4.1,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-015',
    name: 'NovaTech 100W Charger',
    brandId: 'brand-007',
    categoryId: 'category-005',
    description:
      'Compact high-output USB-C charger suitable for laptops, tablets, and smartphones.',
    price: 3999,
    originalPrice: 4499,
    discountPercentage: 11,
    stock: 63,
    images: [
      'https://placehold.co/800x800?text=NovaTech+Charger',
      'https://placehold.co/800x800?text=NovaTech+Charger+Ports',
    ],
    specifications: [
      { key: 'Output', value: '100 W' },
      { key: 'Ports', value: 'USB-C and USB-A' },
      { key: 'Protection', value: 'Over-voltage and over-current' },
    ],
    rating: 4.6,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-016',
    name: 'Elevate Wireless Keyboard',
    brandId: 'brand-008',
    categoryId: 'category-005',
    description:
      'Minimal wireless keyboard with a comfortable layout for office and home setups.',
    price: 4499,
    originalPrice: 4999,
    discountPercentage: 10,
    stock: 29,
    images: [
      'https://placehold.co/800x800?text=Elevate+Keyboard',
      'https://placehold.co/800x800?text=Elevate+Keyboard+Keys',
    ],
    specifications: [
      { key: 'Connection', value: 'Bluetooth / Wireless' },
      { key: 'Layout', value: 'Full-size' },
      { key: 'Battery', value: 'Up to 6 months' },
    ],
    rating: 4.3,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-017',
    name: 'Nexora Precision Mouse',
    brandId: 'brand-004',
    categoryId: 'category-005',
    description:
      'Ergonomic wireless mouse with adjustable sensitivity and precise tracking.',
    price: 2999,
    originalPrice: 3499,
    discountPercentage: 14,
    stock: 41,
    images: [
      'https://placehold.co/800x800?text=Nexora+Mouse',
      'https://placehold.co/800x800?text=Nexora+Mouse+Side',
    ],
    specifications: [
      { key: 'Connection', value: 'Bluetooth / Wireless' },
      { key: 'DPI', value: 'Up to 16000 DPI' },
      { key: 'Battery', value: 'Up to 90 days' },
    ],
    rating: 4.4,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-018',
    name: 'Lumina USB-C Hub',
    brandId: 'brand-003',
    categoryId: 'category-005',
    description:
      'Multi-port USB-C hub for connecting displays, storage, peripherals, and network accessories.',
    price: 3499,
    originalPrice: 3999,
    discountPercentage: 13,
    stock: 34,
    images: [
      'https://placehold.co/800x800?text=Lumina+USB-C+Hub',
      'https://placehold.co/800x800?text=Lumina+Hub+Ports',
    ],
    specifications: [
      { key: 'Ports', value: '8-in-1' },
      { key: 'Video', value: 'HDMI' },
      { key: 'Data', value: 'USB 3.x' },
      { key: 'Power', value: 'USB-C PD' },
    ],
    rating: 4.2,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-019',
    name: 'Orion 27-inch Pro Monitor',
    brandId: 'brand-005',
    categoryId: 'category-006',
    description:
      '27-inch professional monitor with accurate colors and a sharp high-resolution panel.',
    price: 32999,
    originalPrice: 35999,
    discountPercentage: 8,
    stock: 11,
    images: [
      'https://placehold.co/800x800?text=Orion+27+Monitor',
      'https://placehold.co/800x800?text=Orion+Monitor+Back',
    ],
    specifications: [
      { key: 'Size', value: '27-inch' },
      { key: 'Resolution', value: '2560 × 1440' },
      { key: 'Panel', value: 'IPS' },
      { key: 'Refresh Rate', value: '165 Hz' },
    ],
    rating: 4.7,
    status: 'active',
    featured: true,
  }),

  createProduct({
    id: 'product-020',
    name: 'Apex UltraWide Monitor',
    brandId: 'brand-001',
    categoryId: 'category-006',
    description:
      'Ultra-wide display designed for multitasking, productivity, and immersive entertainment.',
    price: 44999,
    originalPrice: 49999,
    discountPercentage: 10,
    stock: 8,
    images: [
      'https://placehold.co/800x800?text=Apex+UltraWide',
      'https://placehold.co/800x800?text=Apex+UltraWide+Desk',
    ],
    specifications: [
      { key: 'Size', value: '34-inch' },
      { key: 'Resolution', value: '3440 × 1440' },
      { key: 'Panel', value: 'IPS' },
      { key: 'Refresh Rate', value: '144 Hz' },
    ],
    rating: 4.6,
    status: 'active',
    featured: true,
  }),

  createProduct({
    id: 'product-021',
    name: 'Vertex Gaming Monitor',
    brandId: 'brand-002',
    categoryId: 'category-006',
    description:
      'Fast gaming monitor with a high refresh rate and low response time.',
    price: 27999,
    originalPrice: 31999,
    discountPercentage: 13,
    stock: 14,
    images: [
      'https://placehold.co/800x800?text=Vertex+Gaming',
      'https://placehold.co/800x800?text=Vertex+Gaming+Back',
    ],
    specifications: [
      { key: 'Size', value: '27-inch' },
      { key: 'Resolution', value: '2560 × 1440' },
      { key: 'Refresh Rate', value: '180 Hz' },
      { key: 'Response Time', value: '1 ms' },
    ],
    rating: 4.5,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-022',
    name: 'Nexora Portable SSD',
    brandId: 'brand-004',
    categoryId: 'category-005',
    description:
      'Fast portable solid-state storage designed for backups and moving large files.',
    price: 6999,
    originalPrice: 7999,
    discountPercentage: 13,
    stock: 26,
    images: [
      'https://placehold.co/800x800?text=Nexora+SSD',
      'https://placehold.co/800x800?text=Nexora+SSD+Side',
    ],
    specifications: [
      { key: 'Capacity', value: '1 TB' },
      { key: 'Interface', value: 'USB-C' },
      { key: 'Type', value: 'Portable SSD' },
    ],
    rating: 4.7,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-023',
    name: 'Pulse Mechanical Keyboard',
    brandId: 'brand-006',
    categoryId: 'category-005',
    description:
      'Mechanical keyboard designed for productivity and gaming with tactile switches.',
    price: 6999,
    originalPrice: 7999,
    discountPercentage: 13,
    stock: 17,
    images: [
      'https://placehold.co/800x800?text=Pulse+Mechanical',
      'https://placehold.co/800x800?text=Pulse+Mechanical+Keys',
    ],
    specifications: [
      { key: 'Switches', value: 'Mechanical tactile' },
      { key: 'Layout', value: '75%' },
      { key: 'Connection', value: 'USB-C / Wireless' },
    ],
    rating: 4.6,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-024',
    name: 'Elevate Laptop Stand',
    brandId: 'brand-008',
    categoryId: 'category-005',
    description:
      'Adjustable aluminum laptop stand for a cleaner and more ergonomic desk setup.',
    price: 2499,
    originalPrice: 2999,
    discountPercentage: 17,
    stock: 39,
    images: [
      'https://placehold.co/800x800?text=Elevate+Stand',
      'https://placehold.co/800x800?text=Elevate+Stand+Desk',
    ],
    specifications: [
      { key: 'Material', value: 'Aluminum alloy' },
      { key: 'Adjustment', value: 'Multi-angle' },
      { key: 'Compatibility', value: 'Most laptops' },
    ],
    rating: 4.4,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-025',
    name: 'Lumina Power Bank 20K',
    brandId: 'brand-003',
    categoryId: 'category-005',
    description:
      'High-capacity portable battery with fast charging for phones, tablets, and other devices.',
    price: 2999,
    originalPrice: 3499,
    discountPercentage: 14,
    stock: 45,
    images: [
      'https://placehold.co/800x800?text=Lumina+Power+Bank',
      'https://placehold.co/800x800?text=Lumina+Power+Bank+Ports',
    ],
    specifications: [
      { key: 'Capacity', value: '20,000 mAh' },
      { key: 'Output', value: '30 W' },
      { key: 'Ports', value: 'USB-C and USB-A' },
    ],
    rating: 4.5,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-026',
    name: 'NovaTech 4K Webcam',
    brandId: 'brand-007',
    categoryId: 'category-005',
    description:
      'High-resolution webcam designed for video meetings, streaming, and remote collaboration.',
    price: 5999,
    originalPrice: 6999,
    discountPercentage: 14,
    stock: 19,
    images: [
      'https://placehold.co/800x800?text=NovaTech+Webcam',
      'https://placehold.co/800x800?text=NovaTech+Webcam+Mount',
    ],
    specifications: [
      { key: 'Resolution', value: '4K' },
      { key: 'Microphone', value: 'Dual microphone' },
      { key: 'Connection', value: 'USB-C' },
    ],
    rating: 4.3,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-027',
    name: 'Orion Gaming Headset',
    brandId: 'brand-005',
    categoryId: 'category-003',
    description:
      'Comfortable gaming headset with surround audio and a detachable microphone.',
    price: 8999,
    originalPrice: 9999,
    discountPercentage: 10,
    stock: 23,
    images: [
      'https://placehold.co/800x800?text=Orion+Gaming+Headset',
      'https://placehold.co/800x800?text=Orion+Headset+Mic',
    ],
    specifications: [
      { key: 'Audio', value: 'Virtual surround' },
      { key: 'Microphone', value: 'Detachable' },
      { key: 'Connection', value: 'USB / 3.5 mm' },
    ],
    rating: 4.4,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-028',
    name: 'Apex Smart Display',
    brandId: 'brand-001',
    categoryId: 'category-006',
    description:
      'Compact smart display designed for media, productivity, and connected-home use.',
    price: 11999,
    originalPrice: 13999,
    discountPercentage: 14,
    stock: 16,
    images: [
      'https://placehold.co/800x800?text=Apex+Smart+Display',
      'https://placehold.co/800x800?text=Apex+Smart+Display+Side',
    ],
    specifications: [
      { key: 'Display', value: '10-inch Full HD' },
      { key: 'Connectivity', value: 'Wi-Fi and Bluetooth' },
      { key: 'Speakers', value: 'Stereo' },
    ],
    rating: 4.2,
    status: 'active',
    featured: false,
  }),

  createProduct({
    id: 'product-029',
    name: 'Vertex Tablet Pro',
    brandId: 'brand-002',
    categoryId: 'category-001',
    description:
      'Large-screen tablet suitable for media consumption, productivity, and creative work.',
    price: 32999,
    originalPrice: 36999,
    discountPercentage: 11,
    stock: 13,
    images: [
      'https://placehold.co/800x800?text=Vertex+Tablet',
      'https://placehold.co/800x800?text=Vertex+Tablet+Back',
    ],
    specifications: [
      { key: 'Display', value: '11-inch 2.5K' },
      { key: 'RAM', value: '8 GB' },
      { key: 'Storage', value: '256 GB' },
      { key: 'Battery', value: '8000 mAh' },
    ],
    rating: 4.5,
    status: 'active',
    featured: true,
  }),

  createProduct({
    id: 'product-030',
    name: 'Nexora Smart Speaker',
    brandId: 'brand-004',
    categoryId: 'category-003',
    description:
      'Compact connected speaker for music playback, smart-home control, and everyday assistance.',
    price: 4999,
    originalPrice: 5999,
    discountPercentage: 17,
    stock: 37,
    images: [
      'https://placehold.co/800x800?text=Nexora+Speaker',
      'https://placehold.co/800x800?text=Nexora+Speaker+Top',
    ],
    specifications: [
      { key: 'Connectivity', value: 'Wi-Fi and Bluetooth' },
      { key: 'Audio', value: '360-degree sound' },
      { key: 'Microphones', value: 'Far-field array' },
    ],
    rating: 4.2,
    status: 'active',
    featured: false,
  }),
];