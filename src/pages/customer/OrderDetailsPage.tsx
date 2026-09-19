import { Link, useParams } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';
import { selectOrderById } from '@/store/selectors/orderSelectors';
import type { OrderStatus } from '@/types';

const statusStyles: Record<OrderStatus, string> = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  confirmed: 'bg-blue-50 text-blue-700 ring-blue-200',
  processing: 'bg-violet-50 text-violet-700 ring-violet-200',
  shipped: 'bg-cyan-50 text-cyan-700 ring-cyan-200',
  delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  cancelled: 'bg-red-50 text-red-700 ring-red-200',
};

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const trackingSteps: OrderStatus[] = [
  'confirmed',
  'processing',
  'shipped',
  'delivered',
];

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const order = useAppSelector((state) =>
    id ? selectOrderById(state, id) : null,
  );

  if (!order) {
    return (
      <main className="min-h-[70vh] bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-neutral-400 shadow-sm ring-1 ring-neutral-200">
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
                d="M9.172 16.172 12 13.343l2.828 2.829M12 13.343V7m8 5a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
              />
            </svg>
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Order unavailable
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900">
            Order not found
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-neutral-600">
            We couldn't find an order matching this ID. It may have been
            removed or the link may be incorrect.
          </p>

          <Link
            to="/orders"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  const currentStatusIndex = trackingSteps.indexOf(order.status);
  const isCancelled = order.status === 'cancelled';

  const formattedDate = new Date(order.createdAt).toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    },
  );

  const totalItems = order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <main className="bg-neutral-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
          <Link
            to="/"
            className="text-neutral-500 transition hover:text-neutral-900"
          >
            Home
          </Link>

          <span className="text-neutral-300">/</span>

          <Link
            to="/orders"
            className="text-neutral-500 transition hover:text-neutral-900"
          >
            Orders
          </Link>

          <span className="text-neutral-300">/</span>

          <span className="font-medium text-neutral-900">{order.id}</span>
        </div>

        {/* Header */}
        <header className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                  Order {order.id}
                </h1>

                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${
                    statusStyles[order.status]
                  }`}
                >
                  {statusLabels[order.status]}
                </span>
              </div>

              <p className="mt-2 text-sm text-neutral-600">
                Placed on {formattedDate}
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
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

          {/* Order progress */}
          {!isCancelled && (
            <div className="mt-8 border-t border-neutral-100 pt-7">
              <div className="grid grid-cols-4 gap-2">
                {trackingSteps.map((step, index) => {
                  const isCompleted = currentStatusIndex >= index;
                  const isCurrent = order.status === step;

                  return (
                    <div key={step} className="relative text-center">
                      {index < trackingSteps.length - 1 && (
                        <div
                          className={`absolute left-1/2 top-3.5 hidden h-0.5 w-full sm:block ${
                            currentStatusIndex > index
                              ? 'bg-neutral-900'
                              : 'bg-neutral-200'
                          }`}
                          aria-hidden="true"
                        />
                      )}

                      <div className="relative flex justify-center">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                            isCompleted
                              ? 'border-neutral-900 bg-neutral-900 text-white'
                              : 'border-neutral-200 bg-white text-neutral-400'
                          }`}
                        >
                          {isCompleted ? (
                            <svg
                              aria-hidden="true"
                              className="h-3.5 w-3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m5 12 4 4L19 6"
                              />
                            </svg>
                          ) : (
                            <span className="h-2 w-2 rounded-full bg-current" />
                          )}
                        </span>
                      </div>

                      <p
                        className={`mt-2 text-[11px] font-semibold sm:text-xs ${
                          isCurrent
                            ? 'text-neutral-900'
                            : isCompleted
                              ? 'text-neutral-700'
                              : 'text-neutral-400'
                        }`}
                      >
                        {statusLabels[step]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {isCancelled && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 ring-1 ring-inset ring-red-100">
              <div className="flex gap-3">
                <svg
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.5m0 3.5h.01M10.3 3.8 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z"
                  />
                </svg>

                <div>
                  <p className="text-sm font-semibold text-red-800">
                    This order has been cancelled
                  </p>
                  <p className="mt-1 text-xs leading-5 text-red-700">
                    If you have questions about this order, please contact
                    support.
                  </p>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Main content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            {/* Items */}
            <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 sm:px-6">
                <div>
                  <h2 className="font-bold text-neutral-900">Order Items</h2>
                  <p className="mt-1 text-xs text-neutral-500">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>

              <div className="divide-y divide-neutral-100 px-5 sm:px-6">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 py-5 first:pt-5"
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-neutral-200 sm:h-24 sm:w-24">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.src =
                            'https://placehold.co/160x160?text=NOVA';
                        }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-neutral-900">
                        {item.productName}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-500">
                        ₹{item.unitPrice.toLocaleString('en-IN')} ×{' '}
                        {item.quantity}
                      </p>

                      <p className="mt-2 text-xs font-medium text-neutral-500">
                        Product ID: {item.productId}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold text-neutral-900 sm:text-base">
                        ₹{item.totalPrice.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Shipping */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
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
                  <h2 className="font-bold text-neutral-900">
                    Shipping Address
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Delivery information
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-neutral-50 p-4 text-sm leading-6 text-neutral-600">
                <p className="font-semibold text-neutral-900">
                  {order.shippingAddress.fullName}
                </p>

                <p>{order.shippingAddress.phone}</p>

                <p className="mt-2">
                  {order.shippingAddress.addressLine1}
                </p>

                {order.shippingAddress.addressLine2 && (
                  <p>{order.shippingAddress.addressLine2}</p>
                )}

                <p>
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.state}{' '}
                  {order.shippingAddress.postalCode}
                </p>

                <p>{order.shippingAddress.country}</p>
              </div>
            </section>
          </div>

          {/* Summary */}
          <aside className="h-fit lg:sticky lg:top-6">
            <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold text-neutral-900">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-neutral-600">Items</span>
                  <span className="font-medium text-neutral-900">
                    {totalItems}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium text-neutral-900">
                    ₹{order.subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-neutral-600">Discount</span>
                  <span className="font-medium text-emerald-600">
                    −₹{order.discount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-neutral-600">Payment</span>
                  <span className="max-w-32 text-right font-medium text-neutral-900">
                    {order.paymentMethod}
                  </span>
                </div>

                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <span className="font-bold text-neutral-900">Total</span>

                    <span className="text-xl font-bold text-neutral-900">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/orders"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Orders
              </Link>
            </section>
          </aside>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <p className="text-sm font-semibold text-neutral-900">
            Looking for something else?
          </p>

          <p className="mt-1 text-sm text-neutral-500">
            Explore more products from NOVA Store.
          </p>

          <Link
            to="/shop"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
          >
            Explore Products
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
      </div>
    </main>
  );
};

export default OrderDetailsPage;