import { useState } from 'react';
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const cartItemCount = useAppSelector(selectCartItemCount);
  const wishlistCount = useAppSelector(selectWishlistCount);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    closeMobileMenu();
    navigate('/');
  };

  const userInitials =
    currentUser?.name
      .split(' ')
      .map((name) => name.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? '';

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group flex items-center gap-2.5"
          aria-label="NOVA home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-950 text-xs font-black tracking-tight text-white shadow-sm">
            N
          </span>

          <span className="text-[19px] font-bold tracking-[-0.03em] text-neutral-950 transition group-hover:text-neutral-600">
            NOVA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-neutral-100 text-neutral-950'
                    : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-950'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Orders / Admin */}
          {isAuthenticated && currentUser && (
            <NavLink
              to={currentUser.role === 'admin' ? '/admin' : '/orders'}
              className={({ isActive }) =>
                `hidden rounded-lg px-3 py-2 text-sm font-medium transition sm:block ${
                  isActive
                    ? 'bg-neutral-100 text-neutral-950'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
                }`
              }
            >
              {currentUser.role === 'admin' ? 'Admin' : 'Orders'}
            </NavLink>
          )}

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-neutral-600 transition-all hover:bg-neutral-100 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-[19px] w-[19px] transition-transform duration-200 group-hover:scale-105"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
              />
            </svg>

            {wishlistCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-neutral-950 px-1 text-[9px] font-bold leading-none text-white ring-2 ring-white">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label={`Cart${cartItemCount > 0 ? `, ${cartItemCount} items` : ''}`}
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-neutral-600 transition-all hover:bg-neutral-100 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-[19px] w-[19px] transition-transform duration-200 group-hover:scale-105"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.95-1.55L21 7H6"
              />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>

            {cartItemCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-neutral-950 px-1 text-[9px] font-bold leading-none text-white ring-2 ring-white">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </Link>

          {/* Account */}
          {isAuthenticated && currentUser ? (
            <div className="ml-1 hidden items-center gap-2 border-l border-neutral-200 pl-3 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-[11px] font-bold text-white">
                {userInitials}
              </div>

              <div className="hidden max-w-24 lg:block">
                <p className="truncate text-xs font-medium text-neutral-400">
                  {currentUser.role === 'admin' ? 'Administrator' : 'Signed in as'}
                </p>

                <p className="truncate text-sm font-semibold text-neutral-800">
                  {currentUser.name.split(' ')[0]}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-600 transition hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-1 hidden rounded-xl bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950/20 sm:block"
            >
              Sign in
            </Link>
          )}

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            aria-label={
              isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={isMobileMenuOpen}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-xl text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950/10 md:hidden"
          >
            {isMobileMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-neutral-200 bg-white shadow-lg md:hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-7xl px-4 py-4 sm:px-6"
          >
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-neutral-950 text-white'
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
                    }`
                  }
                >
                  {item.label}

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4 opacity-50"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 18 6-6-6-6"
                    />
                  </svg>
                </NavLink>
              ))}
            </div>

            {/* Mobile Account */}
            {isAuthenticated && currentUser ? (
              <div className="mt-4 border-t border-neutral-200 pt-4">
                <div className="mb-3 flex items-center gap-3 rounded-xl bg-neutral-50 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-xs font-bold text-white">
                    {userInitials}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-neutral-900">
                      {currentUser.name}
                    </p>

                    <p className="text-xs capitalize text-neutral-500">
                      {currentUser.role}
                    </p>
                  </div>
                </div>

                <NavLink
                  to={currentUser.role === 'admin' ? '/admin' : '/orders'}
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
                >
                  {currentUser.role === 'admin' ? 'Admin Dashboard' : 'My Orders'}

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4 opacity-50"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 18 6-6-6-6"
                    />
                  </svg>
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/10"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-4 border-t border-neutral-200 pt-4">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block rounded-xl bg-neutral-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  Sign in
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
