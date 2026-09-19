import { Link } from 'react-router-dom';

import { mockCategories, mockUsers } from '@/data';
import { useAppSelector } from '@/store/hooks';
import { selectOrders } from '@/store/selectors/orderSelectors';
import { selectProducts } from '@/store/selectors/productSelectors';
import { selectProductsLoading } from '@/store/selectors/productSelectors';

const AdminDashboardPage = () => {
  const products = useAppSelector(selectProducts);
  const orders = useAppSelector(selectOrders);
  const productsLoading = useAppSelector(selectProductsLoading);

  const customers = mockUsers.filter((user) => user.role === 'customer');

  const activeProducts = products.filter((product) => product.status === 'active');

  const totalRevenue = orders.reduce((total, order) => total + order.total, 0);

  const recentOrders = orders.slice(0, 5);

  const stats = [
    {
      label: 'Total Products',
      value: productsLoading ? '...' : products.length,
      description: productsLoading ? 'Loading products' : `${activeProducts.length} active`,
    },
    {
      label: 'Categories',
      value: mockCategories.length,
      description: 'Product categories',
    },
    {
      label: 'Customers',
      value: customers.length,
      description: 'Registered customers',
    },
    {
      label: 'Orders',
      value: orders.length,
      description: 'Total orders',
    },
    {
      label: 'Revenue',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      description: 'From recorded orders',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div>
        <p className="text-sm font-medium text-neutral-500">Overview</p>

        <h1 className="mt-1 text-3xl font-bold text-neutral-900">Dashboard</h1>

        <p className="mt-2 text-neutral-600">Monitor your store and manage its core data.</p>
      </div>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-neutral-500">{stat.label}</p>

            <p className="mt-3 text-2xl font-bold text-neutral-900">{stat.value}</p>

            <p className="mt-1 text-xs text-neutral-500">{stat.description}</p>
          </div>
        ))}
      </section>

      {/* Management shortcuts */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-neutral-900">Quick Management</h2>

          <p className="mt-1 text-sm text-neutral-500">
            Quickly access the main store management areas.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/admin/categories"
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
          >
            <h3 className="font-semibold text-neutral-900">Manage Categories</h3>

            <p className="mt-2 text-sm text-neutral-500">
              Create, update, and remove product categories.
            </p>

            <span className="mt-4 inline-block text-sm font-semibold text-neutral-900">
              Open Categories →
            </span>
          </Link>

          <Link
            to="/admin/products"
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
          >
            <h3 className="font-semibold text-neutral-900">Manage Products</h3>

            <p className="mt-2 text-sm text-neutral-500">
              Manage inventory, pricing, status, and product details.
            </p>

            <span className="mt-4 inline-block text-sm font-semibold text-neutral-900">
              Open Products →
            </span>
          </Link>

          <Link
            to="/admin/orders"
            className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
          >
            <h3 className="font-semibold text-neutral-900">Order Tracking</h3>

            <p className="mt-2 text-sm text-neutral-500">
              Review customer orders and their current status.
            </p>

            <span className="mt-4 inline-block text-sm font-semibold text-neutral-900">
              Open Orders →
            </span>
          </Link>
        </div>
      </section>

      {/* Recent orders */}
      <section className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-neutral-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-neutral-900">Recent Orders</h2>

            <p className="mt-1 text-sm text-neutral-500">Latest customer orders.</p>
          </div>

          <Link
            to="/admin/orders"
            className="text-sm font-semibold text-neutral-900 hover:underline"
          >
            View all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-neutral-500">No orders have been placed yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Order ID
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Customer
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Items
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Total
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-neutral-100 last:border-0">
                    <td className="px-5 py-4 text-sm font-semibold text-neutral-900">{order.id}</td>

                    <td className="px-5 py-4 text-sm text-neutral-700">{order.customerName}</td>

                    <td className="px-5 py-4 text-sm text-neutral-700">
                      {order.items.reduce((total, item) => total + item.quantity, 0)}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-neutral-900">
                      ₹{order.total.toLocaleString('en-IN')}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold capitalize text-neutral-700">
                        {order.status}
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
