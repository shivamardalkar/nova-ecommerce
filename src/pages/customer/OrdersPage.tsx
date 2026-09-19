import { Link } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';

import { selectCurrentUser } from '@/store/selectors/authSelectors';
import { selectOrders } from '@/store/selectors/orderSelectors';

import type { OrderStatus } from '@/types';

const statusStyles: Record<
  OrderStatus,
  {
    label: string;
    className: string;
    dotClassName: string;
  }
> = {
  pending: {
    label: 'Pending',
    className: 'bg-amber-50 text-amber-700 ring-amber-200',
    dotClassName: 'bg-amber-500',
  },
  confirmed: {
    label: 'Confirmed',
    className: 'bg-blue-50 text-blue-700 ring-blue-200',
    dotClassName: 'bg-blue-500',
  },
  processing: {
    label: 'Processing',
    className: 'bg-violet-50 text-violet-700 ring-violet-200',
    dotClassName: 'bg-violet-500',
  },
  shipped: {
    label: 'Shipped',
    className: 'bg-cyan-50 text-cyan-700 ring-cyan-200',
    dotClassName: 'bg-cyan-500',
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    dotClassName: 'bg-emerald-500',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-50 text-red-700 ring-red-200',
    dotClassName: 'bg-red-500',
  },
};

const OrdersPage = () => {
  const user = useAppSelector(selectCurrentUser);
  const orders = useAppSelector(selectOrders);

  const customerOrders = orders.filter(
    (order) => order.customerId === user?.id,
  );

  const totalItems = customerOrders.reduce(
    (total, order) =>
      total +
      order.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0),
    0,
  );

  const deliveredOrders = customerOrders.filter(
    (order) => order.status === 'delivered',
  ).length;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatus = (status: OrderStatus) => {
    return statusStyles[status] ?? {
      label: status,
      className: 'bg-neutral-100 text-neutral-700 ring-neutral-200',
      dotClassName: 'bg-neutral-500',
    };
  };

  if (customerOrders.length === 0) {
    return (
      <main className="min-h-[calc(100vh-5rem)] bg-neutral-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-3xl items-center justify-center">
          <section className="w-full rounded-2xl border border-neutral-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 3h12l1 5H5l1-5Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 8h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6"
                />
              </svg>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
              Order history
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
              No orders yet
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
              You haven&apos;t placed an order yet. Explore our collection and
              find something you&apos;ll love.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-950/10"
            >
              Start shopping
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-neutral-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page header */}
        <header className="mb-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-neutral-400">
                <Link
                  to="/"
                  className="transition hover:text-neutral-700"
                >
                  Home
                </Link>

                <span aria-hidden="true">/</span>

                <span className="text-neutral-600">Orders</span>
              </div>

              <h1 className="text-3xl font-bold tracking-[-0.03em] text-neutral-950 sm:text-4xl">
                My Orders
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                Track your purchases and view the details of your previous
                orders.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-neutral-400 hover:bg-neutral-50 focus:outline-none focus:ring-4 focus:ring-neutral-950/5"
            >
              Continue shopping
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </Link>
          </div>
        </header>

        {/* Summary */}
        <section
          aria-label="Order summary"
          className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                  Total orders
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-950">
                  {customerOrders.length}
                </p>
              </div>

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 3h12l1 5H5l1-5Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 8h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8Z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                  Items purchased
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-950">
                  {totalItems}
                </p>
              </div>

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 7h12l1 13H5L6 7Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 7V5a3 3 0 0 1 6 0v2"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                  Delivered
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-950">
                  {deliveredOrders}
                </p>
              </div>

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8 12 2.5 2.5L16 9"
                  />
                </svg>
              </span>
            </div>
          </div>
        </section>

        {/* Orders */}
        <section aria-label="Your orders" className="space-y-4">
          {customerOrders.map((order) => {
            const status = getStatus(order.status);

            const orderItemCount = order.items.reduce(
              (total, item) => total + item.quantity,
              0,
            );

            return (
              <article
                key={order.id}
                className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:border-neutral-300"
              >
                {/* Order header */}
                <div className="border-b border-neutral-200 px-5 py-4 sm:px-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                          Order
                        </p>

                        <p className="mt-1 text-sm font-bold text-neutral-950">
                          {order.id}
                        </p>
                      </div>

                      <div className="hidden h-7 w-px bg-neutral-200 sm:block" />

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                          Placed
                        </p>

                        <p className="mt-1 text-sm font-medium text-neutral-700">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <div className="hidden h-7 w-px bg-neutral-200 sm:block" />

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                          Items
                        </p>

                        <p className="mt-1 text-sm font-medium text-neutral-700">
                          {orderItemCount}{' '}
                          {orderItemCount === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ring-1 ring-inset ${status.className}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${status.dotClassName}`}
                      />

                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="px-5 py-5 sm:px-6">
                  <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div className="flex min-w-0 flex-wrap gap-3">
                      {order.items.map((item) => (
                        <div
                          key={item.productId}
                          className="flex min-w-0 flex-1 basis-full items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-2.5 sm:basis-[calc(50%-0.375rem)] lg:max-w-[360px]"
                        >
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-neutral-200">
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

                          <div className="min-w-0">
                            <p className="line-clamp-2 text-sm font-semibold leading-5 text-neutral-900">
                              {item.productName}
                            </p>

                            <p className="mt-1 text-xs text-neutral-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total + action */}
                    <div className="flex items-center justify-between gap-5 border-t border-neutral-200 pt-4 lg:min-w-[230px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                          Order total
                        </p>

                        <p className="mt-1 text-xl font-bold tracking-tight text-neutral-950">
                          ₹{order.total.toLocaleString('en-IN')}
                        </p>
                      </div>

                      <Link
                        to={`/orders/${order.id}`}
                        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3.5 text-xs font-semibold text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50 focus:outline-none focus:ring-4 focus:ring-neutral-950/5"
                      >
                        Details

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9 18 6-6-6-6"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Bottom CTA */}
        <div className="mt-7 flex justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition hover:text-neutral-950"
          >
            Continue exploring products

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OrdersPage;