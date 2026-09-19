import { NavLink } from 'react-router-dom';

const navigationItems = [
  {
    label: 'Dashboard',
    to: '/admin',
  },
  {
    label: 'Categories',
    to: '/admin/categories',
  },
  {
    label: 'Products',
    to: '/admin/products',
  },
  {
    label: 'Orders',
    to: '/admin/orders',
  },
];

const AdminSidebar = () => {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-neutral-200 bg-white lg:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="flex h-16 items-center border-b border-neutral-200 px-6">
          <NavLink to="/admin" className="text-xl font-bold tracking-tight text-neutral-900">
            NOVA
            <span className="ml-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
              Admin
            </span>
          </NavLink>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
