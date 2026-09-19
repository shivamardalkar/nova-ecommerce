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

const ORDER_STATUS_STYLES: Record<OrderStatus, string> = {
  pending: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  confirmed: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
  processing: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200',
  shipped: 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200',
  delivered: 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-200',
  cancelled: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200',
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

  const totalRevenue = useMemo(() => {
    return orders
      .filter((order) => order.status !== 'cancelled')
      .reduce((total, order) => total + order.total, 0);
  }, [orders]);

  const totalItems = useMemo(() => {
    return orders.reduce(
      (total, order) =>
        total + order.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0),
      0,
    );
  }, [orders]);

  const deliveredOrders = useMemo(() => {
    return orders.filter((order) => order.status === 'delivered').length;
  }, [orders]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M6 3h12v18H6z" />
                <path d="M9 7h6M9 11h6M9 15h4" />
              </svg>
            </span>

            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
              Order Management
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
            Order Tracking
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-neutral-500">
            Monitor customer orders, fulfillment status, quantities, and order totals.
          </p>
        </div>

        <div className="w-full sm:w-56">
          <label
            htmlFor="order-status-filter"
            className="mb-1.5 block text-sm font-medium text-neutral-700"
          >
            Filter by status
          </label>

          <select
            id="order-status-filter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as 'all' | OrderStatus)
            }
            className="h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
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

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Total Orders</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                {orders.length}
              </p>
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6 3h12v18H6z" />
                <path d="M9 7h6M9 11h6M9 15h4" />
              </svg>
            </span>
          </div>

          <p className="mt-3 text-xs text-neutral-400">All recorded orders</p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Delivered</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                {deliveredOrders}
              </p>
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-700">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </span>
          </div>

          <p className="mt-3 text-xs text-neutral-400">Successfully fulfilled</p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Items Ordered</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                {totalItems}
              </p>
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6 7h12l1 13H5L6 7Z" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
            </span>
          </div>

          <p className="mt-3 text-xs text-neutral-400">Across all orders</p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Order Value</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </p>
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-700">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12 3v18M17 7.5c0-1.7-2.2-3-5-3S7 5.8 7 7.5 9.2 10 12 10s5 1.3 5 3-2.2 3-5 3-5-1.3-5-3" />
              </svg>
            </span>
          </div>

          <p className="mt-3 text-xs text-neutral-400">Excluding cancelled orders</p>
        </div>
      </div>

      {/* Ledger */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-neutral-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-neutral-950">Order Ledger</h2>
            <p className="mt-0.5 text-xs text-neutral-500">
              Read-only overview of customer orders.
            </p>
          </div>

          <span className="inline-flex w-fit items-center rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
            {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
          </span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 text-neutral-500"
                aria-hidden="true"
              >
                <path d="M6 3h12v18H6z" />
                <path d="M9 7h6M9 11h6M9 15h4" />
              </svg>
            </div>

            <h2 className="mt-4 text-lg font-medium text-neutral-900">No orders found</h2>

            <p className="mx-auto mt-1 max-w-md text-sm text-neutral-500">
              There are no orders matching the selected status.
            </p>

            {statusFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className="mt-4 inline-flex h-9 items-center rounded-lg border border-neutral-300 px-3.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
              >
                Clear filter
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full text-left">
              <thead className="border-b border-neutral-200 bg-neutral-50/80">
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
                    <tr
                      key={order.id}
                      className="transition-colors hover:bg-neutral-50/70"
                    >
                      <td className="px-5 py-4 align-top">
                        <p className="font-mono text-sm font-semibold text-neutral-900">
                          {order.id}
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">
                          {formatOrderDate(order.createdAt)}
                        </p>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <div className="flex items-start gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-700">
                            {order.customerName
                              .split(' ')
                              .map((name) => name[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()}
                          </span>

                          <div>
                            <p className="text-sm font-medium text-neutral-900">
                              {order.customerName}
                            </p>

                            <p className="mt-1 text-xs text-neutral-500">
                              {order.customerId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <p
                              key={item.productId}
                              className="max-w-xs text-sm leading-5 text-neutral-700"
                            >
                              {item.productName}
                            </p>
                          ))}
                        </div>

                        <p className="mt-2 text-xs font-medium text-neutral-500">
                          {order.items.length}{' '}
                          {order.items.length === 1 ? 'product' : 'products'}
                        </p>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <p
                              key={item.productId}
                              className="text-sm font-medium text-neutral-700"
                            >
                              {item.quantity}
                            </p>
                          ))}
                        </div>

                        <p className="mt-2 text-xs font-medium text-neutral-500">
                          {totalQuantity} total
                        </p>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <span className="text-sm font-semibold text-neutral-950">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
                      </td>

                      <td className="px-5 py-4 align-top">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${ORDER_STATUS_STYLES[order.status]}`}
                        >
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
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

      {/* Footer */}
      <div className="flex flex-col gap-1 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <span>
          Showing {filteredOrders.length} of {orders.length} orders
        </span>

        <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
          Read-only order ledger
        </span>
      </div>
    </section>
  );
};

export default AdminOrdersPage;