import { useMemo, useState } from 'react';

import { useAppSelector } from '@/store/hooks';
import { selectOrders } from '@/store/selectors/orderSelectors';
import type { OrderStatus } from '@/types';

const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const formatOrderDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
};

const AdminOrdersPage = () => {
  const orders = useAppSelector(selectOrders);

  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') {
      return orders;
    }

    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Order Tracking</h1>

          <p className="mt-1 text-sm text-neutral-500">
            View customer orders and their current fulfillment status.
          </p>
        </div>

        <div className="w-full sm:w-48">
          <label
            htmlFor="order-status-filter"
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
            Filter by status
          </label>

          <select
            id="order-status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as 'all' | OrderStatus)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-900"
          >
            <option value="all">All statuses</option>

            {Object.entries(ORDER_STATUS_LABELS).map(([status, label]) => (
              <option key={status} value={status}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        {filteredOrders.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
              <span className="text-xl">📦</span>
            </div>

            <h2 className="mt-4 text-lg font-medium text-neutral-900">No orders found</h2>

            <p className="mx-auto mt-1 max-w-md text-sm text-neutral-500">
              There are no orders matching the selected status.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full text-left">
              <thead className="border-b border-neutral-200 bg-neutral-50">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Order
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Customer
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Items
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Qty
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Total Cost
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {filteredOrders.map((order) => {
                  const totalQuantity = order.items.reduce(
                    (total, item) => total + item.quantity,
                    0,
                  );

                  return (
                    <tr key={order.id} className="transition hover:bg-neutral-50">
                      <td className="px-5 py-4 align-top">
                        <p className="font-mono text-sm font-semibold text-neutral-900">
                          {order.id}
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">
                          {formatOrderDate(order.createdAt)}
                        </p>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <p className="text-sm font-medium text-neutral-900">{order.customerName}</p>

                        <p className="mt-1 text-xs text-neutral-500">{order.customerId}</p>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <p key={item.productId} className="max-w-xs text-sm text-neutral-700">
                              {item.productName}
                            </p>
                          ))}
                        </div>

                        <p className="mt-2 text-xs font-medium text-neutral-500">
                          {order.items.length} {order.items.length === 1 ? 'product' : 'products'}
                        </p>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <p key={item.productId} className="text-sm text-neutral-700">
                              {item.quantity}
                            </p>
                          ))}
                        </div>

                        <p className="mt-2 text-xs font-medium text-neutral-500">
                          {totalQuantity} total
                        </p>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <span className="text-sm font-semibold text-neutral-900">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            order.status === 'delivered'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'cancelled'
                                ? 'bg-red-100 text-red-700'
                                : order.status === 'shipped'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {ORDER_STATUS_LABELS[order.status]}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <span>
          Showing {filteredOrders.length} of {orders.length} orders
        </span>

        <span>Read-only order ledger</span>
      </div>
    </section>
  );
};

export default AdminOrdersPage;
