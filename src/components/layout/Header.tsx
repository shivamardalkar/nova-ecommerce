import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from '@/store/selectors/authSelectors';
import { selectCartItemCount } from '@/store/selectors/cartSelectors';
import { selectWishlistCount } from '@/store/selectors/wishlistSelectors';
import { clearUser } from '@/store/slices/authSlice';

const navigationItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Support', to: '/support' },
];

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const cartItemCount = useAppSelector(selectCartItemCount);
  const wishlistCount = useAppSelector(selectWishlistCount);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-neutral-900"
        >
          NOVA
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? 'text-neutral-900'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated && currentUser && (
            <NavLink
              to={
                currentUser.role === 'admin'
                  ? '/admin'
                  : '/orders'
              }
              className={({ isActive }) =>
                `hidden rounded-lg px-3 py-2 text-sm font-medium transition sm:block ${
                  isActive
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`
              }
            >
              {currentUser.role === 'admin'
                ? 'Admin'
                : 'Orders'}
            </NavLink>
          )}

          <Link
            to="/wishlist"
            className="relative rounded-lg p-2 text-sm text-neutral-700 transition hover:bg-neutral-100"
            aria-label="Wishlist"
          >
            ♡

            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1 text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative rounded-lg p-2 text-sm text-neutral-700 transition hover:bg-neutral-100"
            aria-label="Cart"
          >
            🛒

            {cartItemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1 text-[10px] font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </Link>

          {isAuthenticated && currentUser ? (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="max-w-28 truncate text-sm font-medium text-neutral-700">
                {currentUser.name.split(' ')[0]}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 sm:block"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;