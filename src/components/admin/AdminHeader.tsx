import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { selectCurrentUser } from '@/store/selectors/authSelectors';

import { clearUser } from '@/store/slices/authSlice';

const AdminHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/admin/login', { replace: true });
  };

  const displayName = currentUser?.name ?? 'Administrator';
  const initials = displayName
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6">
        {/* Page context */}
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
            Administration
          </p>

          <h1 className="truncate text-sm font-semibold text-neutral-950 sm:text-base">
            NOVA Store Management
          </h1>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Store */}
          <Link
            to="/"
            aria-label="Open NOVA storefront"
            className="hidden items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950/10 sm:inline-flex"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5.5 9.5V21h13V9.5M9.5 21v-6h5v6" />
            </svg>
            Store
          </Link>

          {/* User */}
          <div className="flex items-center gap-2.5 border-l border-neutral-200 pl-2 sm:pl-3">
            <div
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-950 text-xs font-bold text-white"
            >
              {initials}
            </div>

            <div className="hidden min-w-0 md:block">
              <p className="max-w-32 truncate text-sm font-semibold text-neutral-900">
                {displayName}
              </p>

              <p className="text-[11px] text-neutral-500">
                Administrator
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Log out of admin panel"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950/20"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M21 3v18" />
            </svg>

            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;