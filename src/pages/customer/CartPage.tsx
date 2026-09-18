import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  applyCoupon,
  removeCoupon,
} from '@/store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectAppliedCoupon,
  selectAppliedCouponCode,
  selectCartDiscount,
  selectCartItems,
  selectCartSubtotal,
  selectCartTotal,
} from '@/store/selectors/cartSelectors';

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
      <main className="bg-neutral-50 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
            🛒
          </div>

          <h1 className="mt-6 text-3xl font-bold text-neutral-900">Your cart is empty</h1>

          <p className="mt-3 text-neutral-600">
            Looks like you haven't added anything to your cart yet.
          </p>

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
          <p className="text-sm font-medium text-neutral-500">Home / Cart</p>

          <h1 className="mt-2 text-3xl font-bold text-neutral-900">Shopping Cart</h1>

          <p className="mt-2 text-neutral-600">
            {items.length} {items.length === 1 ? 'product' : 'products'} in your cart
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <section className="space-y-4">
            {items.map((item) => (
              <article
                key={item.product.id}
                className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <Link
                    to={`/products/${item.product.id}`}
                    className="h-28 w-full shrink-0 overflow-hidden rounded-lg bg-neutral-100 sm:w-28"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover transition hover:scale-105"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          to={`/products/${item.product.id}`}
                          className="font-semibold text-neutral-900 hover:underline"
                        >
                          {item.product.name}
                        </Link>

                        <p className="mt-1 text-sm text-neutral-500">
                          ₹{item.product.price.toLocaleString('en-IN')} each
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(item.product.id))}
                        className="text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-auto flex flex-col gap-4 pt-5 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
                          Quantity
                        </p>

                        <div className="flex w-fit items-center overflow-hidden rounded-lg border border-neutral-300">
                          <button
                            type="button"
                            onClick={() => dispatch(decreaseQuantity(item.product.id))}
                            disabled={item.quantity <= 1}
                            className="h-10 w-10 text-lg hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label={`Decrease quantity of ${item.product.name}`}
                          >
                            −
                          </button>

                          <span className="flex h-10 w-12 items-center justify-center border-x border-neutral-300 text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => dispatch(increaseQuantity(item.product.id))}
                            disabled={item.quantity >= item.product.stock}
                            className="h-10 w-10 text-lg hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label={`Increase quantity of ${item.product.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <p className="text-lg font-bold text-neutral-900">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-900">Order Summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium text-neutral-900">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-neutral-600">Discount</span>
                <span className="font-medium text-green-600">
                  −₹{discount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="border-t border-neutral-200 pt-4">
                <div className="flex justify-between gap-4">
                  <span className="font-semibold text-neutral-900">Total</span>
                  <span className="text-xl font-bold text-neutral-900">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-neutral-200 pt-6">
              <label htmlFor="coupon" className="text-sm font-semibold text-neutral-900">
                Coupon Code
              </label>

              {appliedCoupon ? (
                <div className="mt-3 flex items-center justify-between rounded-lg bg-green-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-green-800">{appliedCoupon.code}</p>
                    <p className="text-xs text-green-700">Coupon applied</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-sm font-semibold text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
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
                      placeholder="Enter coupon"
                      className="min-w-0 flex-1 rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
                    />

                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700"
                    >
                      Apply
                    </button>
                  </div>

                  {couponError && (
                    <p className="mt-2 text-xs font-medium text-red-600">{couponError}</p>
                  )}

                  <p className="mt-2 text-xs text-neutral-500">Try SAVE10 or WELCOME500.</p>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="mt-6 w-full rounded-lg bg-neutral-900 px-5 py-3.5 font-semibold text-white transition hover:bg-neutral-700"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/shop"
              className="mt-3 block text-center text-sm font-medium text-neutral-600 hover:text-neutral-900"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
