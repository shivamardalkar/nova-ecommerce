import { Link, useParams } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';
import { selectOrderById } from '@/store/selectors/orderSelectors';

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const order = useAppSelector((state) => (id ? selectOrderById(state, id) : null));

  if (!order) {
    return (
      <main className="bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-neutral-900">Order not found</h1>

          <p className="mt-3 text-neutral-600">We couldn't find an order with this ID.</p>

          <Link
            to="/orders"
            className="mt-8 inline-flex rounded-lg bg-neutral-900 px-6 py-3 font-semibold text-white hover:bg-neutral-700"
          >
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-neutral-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500">Home / Orders / {order.id}</p>

            <h1 className="mt-2 text-3xl font-bold text-neutral-900">Order Details</h1>

            <p className="mt-2 text-sm text-neutral-600">
              Placed on{' '}
              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          <span className="w-fit rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold capitalize text-neutral-700">
            {order.status}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-neutral-900">Items</h2>

              <div className="mt-5 divide-y divide-neutral-200">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-neutral-900">{item.productName}</p>

                      <p className="mt-1 text-sm text-neutral-500">
                        ₹{item.unitPrice.toLocaleString('en-IN')} × {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-neutral-900">
                      ₹{item.totalPrice.toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-neutral-900">Shipping Address</h2>

              <div className="mt-4 text-sm leading-6 text-neutral-600">
                <p className="font-semibold text-neutral-900">{order.shippingAddress.fullName}</p>

                <p>{order.shippingAddress.phone}</p>

                <p className="mt-2">{order.shippingAddress.addressLine1}</p>

                {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}

                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.postalCode}
                </p>

                <p>{order.shippingAddress.country}</p>
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-neutral-900">Payment & Summary</h2>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-neutral-600">Payment</span>

                <span className="font-medium text-neutral-900">{order.paymentMethod}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-neutral-600">Subtotal</span>

                <span className="font-medium">₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-neutral-600">Discount</span>

                <span className="font-medium text-green-600">
                  −₹{order.discount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="border-t border-neutral-200 pt-4">
                <div className="flex justify-between gap-4">
                  <span className="font-bold text-neutral-900">Total</span>

                  <span className="text-xl font-bold text-neutral-900">
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/orders"
              className="mt-6 block w-full rounded-lg border border-neutral-300 px-5 py-3 text-center text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
            >
              Back to Orders
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default OrderDetailsPage;
