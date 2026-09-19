import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { selectCurrentUser } from '@/store/selectors/authSelectors';
import {
  selectAppliedCouponCode,
  selectCartDiscount,
  selectCartItems,
  selectCartSubtotal,
  selectCartTotal,
} from '@/store/selectors/cartSelectors';

import { clearCart } from '@/store/slices/cartSlice';
import { addOrder } from '@/store/slices/orderSlice';

import type { ShippingAddress } from '@/types';

const inputClassName =
  'w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10';

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
      <main className="min-h-[70vh] bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-neutral-500 shadow-sm ring-1 ring-neutral-200">
            <svg
              aria-hidden="true"
              className="h-9 w-9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h2l1.5 12h11L19 7H6.2M9 20h.01M17 20h.01"
              />
            </svg>
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Checkout
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900">
            Your cart is empty
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-neutral-600">
            Add some products to your cart before proceeding to checkout.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
          >
            Continue Shopping
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-neutral-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
          <Link to="/" className="text-neutral-500 transition hover:text-neutral-900">
            Home
          </Link>

          <span className="text-neutral-300">/</span>

          <Link to="/cart" className="text-neutral-500 transition hover:text-neutral-900">
            Cart
          </Link>

          <span className="text-neutral-300">/</span>

          <span className="font-medium text-neutral-900">Checkout</span>
        </div>

        {/* Header */}
        <header className="mb-7">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Checkout</h1>

            <p className="text-sm text-neutral-600">
              Complete your delivery details and place your order.
            </p>
          </div>

          {/* Checkout steps */}
          <div className="mt-6 flex items-center gap-2 text-xs font-semibold sm:text-sm">
            <div className="flex items-center gap-2 text-neutral-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-xs text-white">
                1
              </span>
              <span>Delivery</span>
            </div>

            <div className="h-px w-8 bg-neutral-300 sm:w-12" />

            <div className="flex items-center gap-2 text-neutral-500">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 bg-white text-xs">
                2
              </span>
              <span>Payment</span>
            </div>

            <div className="h-px w-8 bg-neutral-300 sm:w-12" />

            <div className="flex items-center gap-2 text-neutral-500">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 bg-white text-xs">
                3
              </span>
              <span>Confirmation</span>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-6">
            {/* Shipping */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7h11v10H3V7Zm11 3h3l4 4v3h-7v-7Zm-7 7a2 2 0 1 1-4 0m13 0a2 2 0 1 1-4 0"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-neutral-900">Shipping Address</h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    required
                    autoComplete="name"
                    value={shippingAddress.fullName}
                    onChange={(event) => updateField('fullName', event.target.value)}
                    className={inputClassName}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={shippingAddress.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    className={inputClassName}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Postal Code
                  </label>

                  <input
                    id="postalCode"
                    required
                    inputMode="numeric"
                    autoComplete="postal-code"
                    value={shippingAddress.postalCode}
                    onChange={(event) => updateField('postalCode', event.target.value)}
                    className={inputClassName}
                    placeholder="411001"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="addressLine1"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Address
                  </label>

                  <input
                    id="addressLine1"
                    required
                    autoComplete="address-line1"
                    value={shippingAddress.addressLine1}
                    onChange={(event) => updateField('addressLine1', event.target.value)}
                    placeholder="House number, street name"
                    className={inputClassName}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="addressLine2"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Address Line 2
                    <span className="ml-1 font-normal text-neutral-400">(Optional)</span>
                  </label>

                  <input
                    id="addressLine2"
                    autoComplete="address-line2"
                    value={shippingAddress.addressLine2}
                    onChange={(event) => updateField('addressLine2', event.target.value)}
                    placeholder="Apartment, landmark, etc."
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    required
                    autoComplete="address-level2"
                    value={shippingAddress.city}
                    onChange={(event) => updateField('city', event.target.value)}
                    placeholder="Pune"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    State
                  </label>

                  <input
                    id="state"
                    required
                    autoComplete="address-level1"
                    value={shippingAddress.state}
                    onChange={(event) => updateField('state', event.target.value)}
                    placeholder="Maharashtra"
                    className={inputClassName}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Country
                  </label>

                  <input
                    id="country"
                    required
                    autoComplete="country-name"
                    value={shippingAddress.country}
                    onChange={(event) => updateField('country', event.target.value)}
                    className={inputClassName}
                  />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <rect width="18" height="13" x="3" y="5" rx="2" />
                    <path strokeLinecap="round" d="M3 10h18M7 15h3" />
                  </svg>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-neutral-900">Payment Method</h2>

                  <p className="mt-1 text-sm text-neutral-500">Choose how you want to pay.</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <label
                  className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                    className="mt-1 h-4 w-4 accent-neutral-900"
                  />

                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900">Cash on Delivery</p>

                    <p className="mt-1 text-sm leading-5 text-neutral-500">
                      Pay when your order arrives at your doorstep.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition ${
                    paymentMethod === 'UPI'
                      ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                    className="mt-1 h-4 w-4 accent-neutral-900"
                  />

                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900">UPI</p>

                    <p className="mt-1 text-sm leading-5 text-neutral-500">
                      Demo payment method for this frontend assessment.
                    </p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Order summary */}
          <aside className="h-fit lg:sticky lg:top-6">
            <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">Order Summary</h2>

                  <p className="mt-1 text-xs text-neutral-500">
                    {cartItems.length} {cartItems.length === 1 ? 'product' : 'products'}
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4h2l1.5 12h11L19 7H6.2"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20h.01M17 20h.01" />
                  </svg>
                </div>
              </div>

              <div className="mt-6 max-h-80 space-y-4 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100 ring-1 ring-neutral-200">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.src = 'https://placehold.co/160x160?text=NOVA';
                        }}
                      />

                      <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1 text-[10px] font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-medium text-neutral-900">
                        {item.product.name}
                      </p>

                      <p className="mt-1 text-xs text-neutral-500">
                        ₹{item.product.price.toLocaleString('en-IN')} each
                      </p>
                    </div>

                    <span className="shrink-0 text-sm font-semibold text-neutral-900">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-neutral-200 pt-5">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-neutral-600">Subtotal</span>

                  <span className="font-medium text-neutral-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {couponCode && (
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-neutral-600">Coupon</span>

                    <span className="font-semibold text-emerald-600">{couponCode}</span>
                  </div>
                )}

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-neutral-600">Discount</span>

                  <span className="font-medium text-emerald-600">
                    −₹{discount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <span className="font-bold text-neutral-900">Total</span>

                    <span className="text-2xl font-bold text-neutral-900">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0 1 8-8V1C5.925 1 1 5.925 1 12h3Z"
                      />
                    </svg>
                    Placing Order...
                  </>
                ) : (
                  <>
                    Place Order
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14m-6-6 6 6-6 6"
                      />
                    </svg>
                  </>
                )}
              </button>

              <Link
                to="/cart"
                className="mt-3 flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900"
              >
                Back to Cart
              </Link>

              <div className="mt-5 border-t border-neutral-100 pt-5">
                <div className="flex items-start gap-3">
                  <svg
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3 5 6v5c0 4.5 3 7.5 7 10 4-2.5 7-5.5 7-10V6l-7-3Z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
                  </svg>

                  <p className="text-xs leading-5 text-neutral-500">
                    Your order information is stored locally for this frontend assessment.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default CheckoutPage;
