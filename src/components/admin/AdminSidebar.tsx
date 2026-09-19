import { NavLink } from 'react-router-dom';

const navigationItems = [
  {
    label: 'Dashboard',
    to: '/admin',
    icon: (
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Categories',
    to: '/admin/categories',
    icon: (
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 5h16M4 12h16M4 19h16" />
        <circle cx="8" cy="5" r="1.5" />
        <circle cx="16" cy="12" r="1.5" />
        <circle cx="10" cy="19" r="1.5" />
      </svg>
    ),
  },
  {
    label: 'Products',
    to: '/admin/products',
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
    label: 'Orders',
    to: '/admin/orders',
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
];

const AdminSidebar = () => {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-neutral-200 bg-white lg:block">
      <div className="sticky top-0 flex h-screen flex-col">
        {/* Brand */}
        <div className="flex h-16 items-center border-b border-neutral-200 px-6">
          <NavLink
            to="/admin"
            aria-label="NOVA Admin Dashboard"
            className="group flex items-center"
          >
            <span className="text-xl font-bold tracking-tight text-neutral-950">
              NOVA
            </span>

            <span className="ml-2 rounded-md bg-neutral-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500 transition group-hover:bg-neutral-200">
              Admin
            </span>
          </NavLink>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Admin navigation"
          className="flex-1 px-3 py-5"
        >
          <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
            Workspace
          </p>

          <div className="space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-neutral-950 text-white shadow-sm'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'bg-neutral-100 text-neutral-500 group-hover:bg-white group-hover:text-neutral-900'
                      }`}
                    >
                      {item.icon}
                    </span>

                    <span>{item.label}</span>

                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-neutral-200 p-4">
          <div className="rounded-lg bg-neutral-50 p-3">
            <p className="text-xs font-semibold text-neutral-900">
              NOVA Administration
            </p>
            <p className="mt-1 text-xs leading-5 text-neutral-500">
              Manage your store from one place.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;