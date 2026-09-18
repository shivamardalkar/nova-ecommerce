import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectAppliedCouponCode,
  selectCartDiscount,
  selectCartItems,
  selectCartSubtotal,
  selectCartTotal,
} from '@/store/selectors/cartSelectors';
import { selectCurrentUser } from '@/store/selectors/authSelectors';
import { clearCart } from '@/store/slices/cartSlice';
import { addOrder } from '@/store/slices/orderSlice';
import type { ShippingAddress } from '@/types';

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectCurrentUser);
  const cartItems = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const discount = useAppSelector(selectCartDiscount);
  const total = useAppSelector(selectCartTotal);
  const couponCode = useAppSelector(selectAppliedCouponCode);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: user?.name ?? '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user || cartItems.length === 0) {
      return;
    }

    setIsSubmitting(true);

    const orderItems = cartItems.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.images[0],
      quantity: item.quantity,
      unitPrice: item.product.price,
      totalPrice: item.product.price * item.quantity,
    }));

    const order = {
      id: `ORD-${Date.now()}`,
      customerId: user.id,
      customerName: user.name,
      items: orderItems,
      subtotal,
      discount,
      total,
      shippingAddress,
      paymentMethod,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    dispatch(addOrder(order));
    dispatch(clearCart());

    navigate(`/order-success/${order.id}`, {
      replace: true,
    });
  };

  if (cartItems.length === 0) {
    return (
      <main className="bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-neutral-900">Your cart is empty</h1>

          <p className="mt-3 text-neutral-600">Add some products before proceeding to checkout.</p>

          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-lg bg-neutral-900 px-6 py-3 font-semibold text-white transition hover:bg-neutral-700"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-neutral-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-neutral-500">Home / Cart / Checkout</p>

          <h1 className="mt-2 text-3xl font-bold text-neutral-900">Checkout</h1>

          <p className="mt-2 text-neutral-600">
            Enter your delivery details and select a payment method.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900">Shipping Address</h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    required
                    value={shippingAddress.fullName}
                    onChange={(event) => updateField('fullName', event.target.value)}
                    className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    required
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Postal Code
                  </label>

                  <input
                    id="postalCode"
                    required
                    inputMode="numeric"
                    value={shippingAddress.postalCode}
                    onChange={(event) => updateField('postalCode', event.target.value)}
                    className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="addressLine1"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Address
                  </label>

                  <input
                    id="addressLine1"
                    required
                    value={shippingAddress.addressLine1}
                    onChange={(event) => updateField('addressLine1', event.target.value)}
                    placeholder="House number, street name"
                    className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="addressLine2"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Address Line 2<span className="ml-1 text-neutral-400">(Optional)</span>
                  </label>

                  <input
                    id="addressLine2"
                    value={shippingAddress.addressLine2}
                    onChange={(event) => updateField('addressLine2', event.target.value)}
                    placeholder="Apartment, landmark, etc."
                    className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="mb-2 block text-sm font-medium text-neutral-700">
                    City
                  </label>

                  <input
                    id="city"
                    required
                    value={shippingAddress.city}
                    onChange={(event) => updateField('city', event.target.value)}
                    className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    State
                  </label>

                  <input
                    id="state"
                    required
                    value={shippingAddress.state}
                    onChange={(event) => updateField('state', event.target.value)}
                    className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-medium text-neutral-700"
                  >
                    Country
                  </label>

                  <input
                    id="country"
                    required
                    value={shippingAddress.country}
                    onChange={(event) => updateField('country', event.target.value)}
                    className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900">Payment Method</h2>

              <div className="mt-5 space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />

                  <div>
                    <p className="font-medium text-neutral-900">Cash on Delivery</p>
                    <p className="text-sm text-neutral-500">Pay when your order arrives.</p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />

                  <div>
                    <p className="font-medium text-neutral-900">UPI</p>
                    <p className="text-sm text-neutral-500">
                      Demo payment method for this frontend assessment.
                    </p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-xl font-bold text-neutral-900">Order Summary</h2>

            <div className="mt-5 space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-neutral-900">
                      {item.product.name}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">Qty: {item.quantity}</p>
                  </div>

                  <span className="text-sm font-semibold text-neutral-900">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-neutral-200 pt-5">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {couponCode && (
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Coupon</span>
                  <span className="font-medium text-green-600">{couponCode}</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Discount</span>
                <span className="font-medium text-green-600">
                  −₹{discount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between border-t border-neutral-200 pt-4">
                <span className="font-bold text-neutral-900">Total</span>
                <span className="text-xl font-bold text-neutral-900">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-lg bg-neutral-900 px-5 py-3.5 font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>

            <Link
              to="/cart"
              className="mt-3 block text-center text-sm font-medium text-neutral-600 hover:text-neutral-900"
            >
              Back to Cart
            </Link>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default CheckoutPage;
