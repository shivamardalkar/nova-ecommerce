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

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Administration
          </p>

          <h1 className="text-sm font-semibold text-neutral-900 sm:text-base">
            NOVA Store Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-neutral-600 sm:block">
            {currentUser?.name ?? 'Administrator'}
          </span>

          <Link
            to="/"
            className="hidden rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 sm:block"
          >
            Store
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-neutral-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
