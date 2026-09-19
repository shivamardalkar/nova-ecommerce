import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import {
  selectAppliedCoupon,
  selectAppliedCouponCode,
  selectCartDiscount,
  selectCartItems,
  selectCartSubtotal,
  selectCartTotal,
} from '@/store/selectors/cartSelectors';

import {
  applyCoupon,
  decreaseQuantity,
  increaseQuantity,
  removeCoupon,
  removeFromCart,
} from '@/store/slices/cartSlice';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const discount = useAppSelector(selectCartDiscount);
  const total = useAppSelector(selectCartTotal);
  const appliedCoupon = useAppSelector(selectAppliedCoupon);
  const appliedCouponCode = useAppSelector(selectAppliedCouponCode);

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleApplyCoupon = () => {
    const normalizedCode = couponCode.trim().toUpperCase();

    if (!normalizedCode) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    if (appliedCouponCode === normalizedCode) {
      setCouponError('This coupon is already applied.');
      return;
    }

    dispatch(applyCoupon(normalizedCode));
    setCouponCode('');
    setCouponError('');
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponError('');
  };

  if (items.length === 0) {
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
            Shopping Cart
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900">
            Your cart is empty
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-neutral-600">
            Looks like you haven't added anything yet. Explore our products
            and find something you'll love.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
          >
            Start Shopping
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
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-neutral-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-7">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-neutral-500 transition hover:text-neutral-900"
            >
              Home
            </Link>

            <span className="text-neutral-300">/</span>

            <span className="font-medium text-neutral-900">Cart</span>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                Shopping Cart
              </h1>

              <p className="mt-2 text-sm text-neutral-600">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} from your
                cart.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-neutral-700 transition hover:text-neutral-900"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14m-6-6 6 6-6 6"
                />
              </svg>
            </Link>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Cart items */}
          <section className="space-y-4">
            {items.map((item) => {
              const isLowStock =
                item.product.stock > 0 && item.product.stock <= 5;

              const isMaxQuantity =
                item.quantity >= item.product.stock;

              return (
                <article
                  key={item.product.id}
                  className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                >
                  <div className="flex gap-4 sm:gap-5">
                    {/* Product image */}
                    <Link
                      to={`/products/${item.product.id}`}
                      className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-neutral-200 sm:h-32 sm:w-32"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.src =
                            'https://placehold.co/320x320?text=NOVA';
                        }}
                      />
                    </Link>

                    {/* Product content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            to={`/products/${item.product.id}`}
                            className="line-clamp-2 text-sm font-semibold text-neutral-900 transition hover:text-neutral-600 sm:text-base"
                          >
                            {item.product.name}
                          </Link>

                          <p className="mt-1 text-sm text-neutral-500">
                            ₹{item.product.price.toLocaleString('en-IN')} each
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            dispatch(removeFromCart(item.product.id))
                          }
                          className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <svg
                            aria-hidden="true"
                            className="h-3.5 w-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 6l12 12M18 6 6 18"
                            />
                          </svg>
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>

                      {/* Quantity + price */}
                      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                            Quantity
                          </p>

                          <div className="flex w-fit items-center overflow-hidden rounded-lg border border-neutral-300">
                            <button
                              type="button"
                              onClick={() =>
                                dispatch(decreaseQuantity(item.product.id))
                              }
                              disabled={item.quantity <= 1}
                              className="flex h-9 w-9 items-center justify-center text-lg text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                              aria-label={`Decrease quantity of ${item.product.name}`}
                            >
                              −
                            </button>

                            <span className="flex h-9 min-w-10 items-center justify-center border-x border-neutral-300 px-2 text-sm font-semibold text-neutral-900">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                dispatch(increaseQuantity(item.product.id))
                              }
                              disabled={isMaxQuantity}
                              className="flex h-9 w-9 items-center justify-center text-lg text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                              aria-label={`Increase quantity of ${item.product.name}`}
                            >
                              +
                            </button>
                          </div>

                          {isLowStock && (
                            <p className="mt-2 text-xs font-medium text-amber-600">
                              Only {item.product.stock} left in stock
                            </p>
                          )}
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                            Item Total
                          </p>

                          <p className="mt-1 text-lg font-bold text-neutral-900">
                            ₹
                            {(
                              item.product.price * item.quantity
                            ).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          {/* Summary */}
          <aside className="h-fit lg:sticky lg:top-6">
            <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">
                    Order Summary
                  </h2>

                  <p className="mt-1 text-xs text-neutral-500">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 20h.01M17 20h.01"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium text-neutral-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-neutral-600">Discount</span>

                  <span className="font-medium text-emerald-600">
                    {discount > 0
                      ? `−₹${discount.toLocaleString('en-IN')}`
                      : '₹0'}
                  </span>
                </div>

                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <span className="font-bold text-neutral-900">Total</span>

                    <span className="text-xl font-bold text-neutral-900">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Coupon */}
              <div className="mt-6 border-t border-neutral-200 pt-6">
                <label
                  htmlFor="coupon"
                  className="text-sm font-semibold text-neutral-900"
                >
                  Have a coupon?
                </label>

                {appliedCoupon ? (
                  <div className="mt-3 rounded-xl bg-emerald-50 p-4 ring-1 ring-inset ring-emerald-100">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <svg
                            aria-hidden="true"
                            className="h-4 w-4 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m5 12 4 4L19 6"
                            />
                          </svg>

                          <p className="text-sm font-bold text-emerald-800">
                            {appliedCoupon.code}
                          </p>
                        </div>

                        <p className="mt-1 text-xs text-emerald-700">
                          Coupon successfully applied
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-xs font-semibold text-red-600 transition hover:text-red-700 focus:outline-none focus:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mt-3 flex gap-2">
                      <input
                        id="coupon"
                        type="text"
                        value={couponCode}
                        onChange={(event) => {
                          setCouponCode(event.target.value);
                          setCouponError('');
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            handleApplyCoupon();
                          }
                        }}
                        placeholder="Enter code"
                        aria-describedby={
                          couponError ? 'coupon-error' : 'coupon-help'
                        }
                        aria-invalid={Boolean(couponError)}
                        className="min-w-0 flex-1 rounded-lg border border-neutral-300 px-3 py-2.5 text-sm uppercase outline-none transition placeholder:normal-case placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                      />

                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                      >
                        Apply
                      </button>
                    </div>

                    {couponError ? (
                      <p
                        id="coupon-error"
                        role="alert"
                        className="mt-2 text-xs font-medium text-red-600"
                      >
                        {couponError}
                      </p>
                    ) : (
                      <p
                        id="coupon-help"
                        className="mt-2 text-xs text-neutral-500"
                      >
                        Try SAVE10 or WELCOME500.
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Checkout */}
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
              >
                Proceed to Checkout

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
              </button>

              <Link
                to="/shop"
                className="mt-3 flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-900"
              >
                Continue Shopping
              </Link>

              {/* Trust note */}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 12 2 2 4-4"
                    />
                  </svg>

                  <p className="text-xs leading-5 text-neutral-500">
                    Your cart is securely saved to your account for your next
                    visit.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CartPage;