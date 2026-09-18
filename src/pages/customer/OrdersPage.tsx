import { Link } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';
import { selectCurrentUser } from '@/store/selectors/authSelectors';
import { selectOrders } from '@/store/selectors/orderSelectors';

const OrdersPage = () => {
  const user = useAppSelector(selectCurrentUser);
  const orders = useAppSelector(selectOrders);

  const customerOrders = orders.filter((order) => order.customerId === user?.id);

  if (customerOrders.length === 0) {
    return (
      <main className="bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
            📦
          </div>

          <h1 className="mt-6 text-3xl font-bold text-neutral-900">No orders yet</h1>

          <p className="mt-3 text-neutral-600">Your completed purchases will appear here.</p>

          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-lg bg-neutral-900 px-6 py-3 font-semibold text-white transition hover:bg-neutral-700"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-neutral-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-neutral-500">Home / Orders</p>

          <h1 className="mt-2 text-3xl font-bold text-neutral-900">My Orders</h1>

          <p className="mt-2 text-neutral-600">View your order history and purchase details.</p>
        </div>

        <div className="space-y-5">
          {customerOrders.map((order) => (
            <article
              key={order.id}
              className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 border-b border-neutral-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Order ID
                  </p>

                  <p className="mt-1 font-bold text-neutral-900">{order.id}</p>
                </div>

                <div className="sm:text-right">
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-neutral-900">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-semibold capitalize text-neutral-700">
                  {order.status}
                </span>
              </div>

              <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-3">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-3 rounded-lg bg-neutral-50 p-2"
                    >
                      <div className="h-14 w-14 overflow-hidden rounded-md bg-white">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="max-w-48">
                        <p className="line-clamp-2 text-sm font-medium text-neutral-900">
                          {item.productName}
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-6 border-t border-neutral-200 pt-4 lg:border-t-0 lg:pt-0">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                      Total
                    </p>

                    <p className="mt-1 text-xl font-bold text-neutral-900">
                      ₹{order.total.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <Link
                    to={`/orders/${order.id}`}
                    className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default OrdersPage;
