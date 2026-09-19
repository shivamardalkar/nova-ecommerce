export type CouponType = 'percentage' | 'fixed';

export interface Coupon {
    id: string;
    code: string;
    type: CouponType;
    value: number;
    minimumOrderValue: number;
    expiresAt: string;
    active: boolean;
}