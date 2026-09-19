import { Link, useParams } from 'react-router-dom';

const OrderSuccessPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="min-h-[70vh] bg-neutral-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-2xl">
        {/* Success card */}
        <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          {/* Success header */}
          <div className="px-6 pb-8 pt-10 text-center sm:px-10 sm:pt-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
              <svg
                aria-hidden="true"
                className="h-9 w-9 text-emerald-600"
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
            </div>

            <p className="mt-7 text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Order Confirmed
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Order placed successfully!
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-neutral-600 sm:text-base">
              Thank you for your purchase. Your order has been created
              successfully and is now being processed.
            </p>
          </div>

          {/* Order information */}
          <div className="border-y border-neutral-200 bg-neutral-50/70 px-6 py-6 sm:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Order ID
                </p>

                <p className="mt-1 font-mono text-sm font-bold text-neutral-900 sm:text-base">
                  {id ?? 'Unavailable'}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-emerald-700">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
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
                      d="m5 12 4 4L19 6"
                    />
                  </svg>
                </span>

                <span className="font-semibold">Confirmed</span>
              </div>
            </div>
          </div>

          {/* Next steps */}
          <div className="px-6 py-7 sm:px-10">
            <h2 className="text-sm font-bold text-neutral-900">
              What happens next?
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-neutral-200 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-sm font-bold text-neutral-700">
                  1
                </div>

                <p className="mt-3 text-sm font-semibold text-neutral-900">
                  Order Processing
                </p>

                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  We'll prepare your items for shipment.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-sm font-bold text-neutral-700">
                  2
                </div>

                <p className="mt-3 text-sm font-semibold text-neutral-900">
                  Order Shipped
                </p>

                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  Your order will be handed over for delivery.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-sm font-bold text-neutral-700">
                  3
                </div>

                <p className="mt-3 text-sm font-semibold text-neutral-900">
                  Delivered
                </p>

                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  Your order arrives at your delivery address.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-neutral-200 px-6 py-6 sm:px-10">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to={`/orders/${id}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
              >
                View Order Details

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

              <Link
                to="/shop"
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
              >
                Continue Shopping
              </Link>
            </div>

            <Link
              to="/orders"
              className="mt-4 flex items-center justify-center text-sm font-semibold text-neutral-500 transition hover:text-neutral-900"
            >
              View all orders
            </Link>
          </div>
        </section>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs leading-5 text-neutral-500">
          Thank you for shopping with NOVA Store.
        </p>
      </div>
    </main>
  );
};

export default OrderSuccessPage;