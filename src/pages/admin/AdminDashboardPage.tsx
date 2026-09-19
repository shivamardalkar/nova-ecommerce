import { Link } from 'react-router-dom';

import { mockCategories, mockUsers } from '@/data';

import { useAppSelector } from '@/store/hooks';

import { selectOrders } from '@/store/selectors/orderSelectors';
import {
  selectProducts,
  selectProductsLoading,
} from '@/store/selectors/productSelectors';

const AdminDashboardPage = () => {
  const products = useAppSelector(selectProducts);
  const orders = useAppSelector(selectOrders);
  const productsLoading = useAppSelector(selectProductsLoading);

  const customers = mockUsers.filter((user) => user.role === 'customer');
  const activeProducts = products.filter(
    (product) => product.status === 'active',
  );

  const totalRevenue = orders.reduce(
    (total, order) => total + order.total,
    0,
  );

  const recentOrders = orders.slice(0, 5);

  const stats = [
    {
      label: 'Total Products',
      value: productsLoading ? '...' : products.length,
      description: productsLoading
        ? 'Loading products'
        : `${activeProducts.length} active`,
      icon: (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="m4.5 7.5 7.5 4 7.5-4M12 12v9" />
        </svg>
      ),
    },
    {
      label: 'Categories',
      value: mockCategories.length,
      description: 'Product categories',
      icon: (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="14" y="14" width="6" height="6" rx="1" />
        </svg>
      ),
    },
    {
      label: 'Customers',
      value: customers.length,
      description: 'Registered customers',
      icon: (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 21c.8-4 3.1-6 7-6s6.2 2 7 6" />
        </svg>
      ),
    },
    {
      label: 'Orders',
      value: orders.length,
      description: 'Total orders',
      icon: (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M6 3h12v18H6z" />
          <path d="M9 7h6M9 11h6M9 15h4" />
        </svg>
      ),
    },
    {
      label: 'Revenue',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      description: 'From recorded orders',
      icon: (
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M12 3v18M16.5 7.5c-.8-1.1-2.1-1.7-4-1.7-2.4 0-4 1.2-4 3 0 4.7 8 2.2 8 6.2 0 1.9-1.7 3.2-4.2 3.2-2 0-3.5-.7-4.5-2" />
        </svg>
      ),
    },
  ];

  const quickActions = [
    {
      title: 'Manage Categories',
      description: 'Create, update, and remove product categories.',
      to: '/admin/categories',
      action: 'Open Categories',
      icon: 'categories',
    },
    {
      title: 'Manage Products',
      description: 'Manage inventory, pricing, status, and product details.',
      to: '/admin/products',
      action: 'Open Products',
      icon: 'products',
    },
    {
      title: 'Order Tracking',
      description: 'Review customer orders and their current status.',
      to: '/admin/orders',
      action: 'Open Orders',
      icon: 'orders',
    },
  ];

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
      case 'shipped':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';
      case 'processing':
        return 'bg-amber-50 text-amber-700 ring-amber-600/20';
      case 'confirmed':
        return 'bg-violet-50 text-violet-700 ring-violet-600/20';
      case 'cancelled':
        return 'bg-red-50 text-red-700 ring-red-600/20';
      default:
        return 'bg-neutral-100 text-neutral-700 ring-neutral-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <section>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">
          Overview
        </p>

        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
              Monitor your store and manage its core data from one place.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950"
          >
            View storefront
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Statistics */}
      <section
        aria-label="Store statistics"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600">
                {stat.icon}
              </div>

              <span className="text-xs font-medium text-neutral-400">
                Overview
              </span>
            </div>

            <p className="mt-5 text-sm font-medium text-neutral-500">
              {stat.label}
            </p>

            <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-950">
              {stat.value}
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              {stat.description}
            </p>
          </div>
        ))}
      </section>

      {/* Quick management */}
      <section>
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
            Management
          </p>

          <h2 className="mt-1 text-xl font-bold text-neutral-950">
            Quick Management
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Quickly access the main store management areas.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="group rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition group-hover:bg-neutral-950 group-hover:text-white">
                  {action.icon === 'categories' && (
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect x="4" y="4" width="6" height="6" rx="1" />
                      <rect x="14" y="4" width="6" height="6" rx="1" />
                      <rect x="4" y="14" width="6" height="6" rx="1" />
                      <rect x="14" y="14" width="6" height="6" rx="1" />
                    </svg>
                  )}

                  {action.icon === 'products' && (
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
                      <path d="m4.5 7.5 7.5 4 7.5-4M12 12v9" />
                    </svg>
                  )}

                  {action.icon === 'orders' && (
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M6 3h12v18H6z" />
                      <path d="M9 7h6M9 11h6M9 15h4" />
                    </svg>
                  )}
                </div>

                <span
                  aria-hidden="true"
                  className="text-lg text-neutral-300 transition group-hover:translate-x-1 group-hover:text-neutral-950"
                >
                  →
                </span>
              </div>

              <h3 className="mt-5 font-semibold text-neutral-950">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                {action.description}
              </p>

              <span className="mt-5 inline-flex text-sm font-semibold text-neutral-900">
                {action.action}
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent orders */}
      <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-neutral-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
              Activity
            </p>

            <h2 className="mt-1 text-lg font-bold text-neutral-950">
              Recent Orders
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Latest customer orders.
            </p>
          </div>

          <Link
            to="/admin/orders"
            className="inline-flex w-fit items-center text-sm font-semibold text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-900"
          >
            View all
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-neutral-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M6 3h12v18H6z" />
                <path d="M9 7h6M9 11h6" />
              </svg>
            </div>

            <p className="mt-4 text-sm font-semibold text-neutral-900">
              No orders yet
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                  <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Order
                  </th>
                  <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Customer
                  </th>
                  <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Items
                  </th>
                  <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Total
                  </th>
                  <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/70"
                  >
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-neutral-950">
                        {order.id}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm text-neutral-700">
                        {order.customerName}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-neutral-700">
                      {order.items.reduce(
                        (total, item) => total + item.quantity,
                        0,
                      )}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-neutral-950">
                      ₹{order.total.toLocaleString('en-IN')}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${getStatusClasses(
                          order.status,
                        )}`}
                      >
                        {order.status.replace('-', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboardPage;