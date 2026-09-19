import type { Coupon } from '@/types';

export const mockCoupons: Coupon[] = [
  {
    id: 'coupon-001',
    code: 'SAVE10',
    type: 'percentage',
    value: 10,
    minimumOrderValue: 1000,
    expiresAt: '2027-12-31T23:59:59.000Z',
    active: true,
  },
  {
    id: 'coupon-002',
    code: 'WELCOME500',
    type: 'fixed',
    value: 500,
    minimumOrderValue: 5000,
    expiresAt: '2027-12-31T23:59:59.000Z',
    active: true,
  },
  {
    id: 'coupon-003',
    code: 'OLD20',
    type: 'percentage',
    value: 20,
    minimumOrderValue: 1000,
    expiresAt: '2025-12-31T23:59:59.000Z',
    active: true,
  },
];