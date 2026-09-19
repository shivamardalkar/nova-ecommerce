import { FormEvent, useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { clearError, login } from '@/store/slices/authSlice';

import {
  selectAuthError,
  selectAuthLoading,
  selectCurrentUser,
  selectIsAuthenticated,
} from '@/store/selectors/authSelectors';

const AdminLoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      return;
    }

    if (currentUser.role === 'admin') {
      const from = location.state?.from?.pathname;

      navigate(from?.startsWith('/admin') ? from : '/admin', {
        replace: true,
      });

      return;
    }

    navigate('/unauthorized', { replace: true });
  }, [currentUser, isAuthenticated, location.state, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    await dispatch(
      login({
        email: email.trim(),
        password,
        expectedRole: 'admin',
      }),
    );
  };

  return (
    <main className="h-dvh overflow-hidden bg-neutral-950">
      <div className="grid h-full lg:grid-cols-[1.05fr_0.95fr]">
        {/* =========================================================
            LEFT BRAND / ADMIN PANEL
        ========================================================== */}
        <section className="relative hidden overflow-hidden bg-neutral-950 lg:flex">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-white/[0.05] blur-3xl" />

            <div className="absolute -bottom-40 -right-20 h-[32rem] w-[32rem] rounded-full bg-white/[0.04] blur-3xl" />
          </div>

          <div className="relative flex w-full flex-col justify-between p-10 xl:p-14">
            {/* Logo */}
            <Link
              to="/"
              className="group inline-flex w-fit items-center gap-3"
              aria-label="NOVA home"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-black text-neutral-950 transition-transform group-hover:scale-105">
                N
              </span>

              <span className="text-xl font-bold tracking-[-0.03em] text-white">
                NOVA
              </span>
            </Link>

            {/* Main content */}
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  Administration
                </span>
              </div>

              <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white xl:text-5xl">
                Manage your
                <br />
                store with confidence.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-neutral-400">
                Manage products, categories, orders, and your store operations
                from one centralized administration workspace.
              </p>

              {/* Admin features */}
              <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-4">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-neutral-950">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <rect x="4" y="4" width="6" height="6" rx="1" />
                      <rect x="14" y="4" width="6" height="6" rx="1" />
                      <rect x="4" y="14" width="6" height="6" rx="1" />
                      <rect x="14" y="14" width="6" height="6" rx="1" />
                    </svg>
                  </div>

                  <p className="text-sm font-semibold text-white">
                    Store management
                  </p>

                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Products and categories
                  </p>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-4">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-neutral-950">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 7h16M4 12h16M4 17h10"
                      />
                    </svg>
                  </div>

                  <p className="text-sm font-semibold text-white">
                    Order tracking
                  </p>

                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Monitor customer orders
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-xs text-neutral-600">
              © {new Date().getFullYear()} NOVA Store
            </p>
          </div>
        </section>

        {/* =========================================================
            RIGHT LOGIN PANEL
        ========================================================== */}
        <section className="relative flex h-full items-center justify-center overflow-y-auto bg-neutral-50 px-5 py-6 sm:px-8">
          <div className="w-full max-w-[420px]">
            {/* Mobile brand */}
            <div className="mb-7 flex justify-center lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-2.5"
                aria-label="NOVA home"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-950 text-sm font-black text-white">
                  N
                </span>

                <span className="text-xl font-bold tracking-[-0.03em] text-neutral-950">
                  NOVA
                </span>
              </Link>
            </div>

            {/* Login card */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3 5 6v5c0 4.4 2.8 8.3 7 9.8 4.2-1.5 7-5.4 7-9.8V6l-7-3Z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 12 2 2 4-4"
                    />
                  </svg>
                </div>

                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  NOVA administration
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Admin sign in
                </h1>

                <p className="mt-1.5 text-sm text-neutral-500">
                  Sign in to access your administration dashboard.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />

                    <path
                      strokeLinecap="round"
                      d="M12 8v4M12 16h.01"
                    />
                  </svg>

                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label
                    htmlFor="admin-email"
                    className="mb-1.5 block text-xs font-semibold text-neutral-700"
                  >
                    Admin email
                  </label>

                  <div className="relative">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-400"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m3 7 9 6 9-6"
                      />
                    </svg>

                    <input
                      id="admin-email"
                      name="email"
                      type="email"
                      autoComplete="username"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="admin@example.com"
                      required
                      className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 hover:border-neutral-300 hover:bg-white focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.04]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="admin-password"
                    className="mb-1.5 block text-xs font-semibold text-neutral-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-400"
                      aria-hidden="true"
                    >
                      <rect x="4" y="10" width="16" height="11" rx="2" />

                      <path
                        strokeLinecap="round"
                        d="M8 10V7a4 4 0 0 1 8 0v3"
                      />
                    </svg>

                    <input
                      id="admin-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      required
                      className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-11 pr-12 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 hover:border-neutral-300 hover:bg-white focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/[0.04]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                      className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-200 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
                    >
                      {showPassword ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-[18px] w-[18px]"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3l18 18"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.6 10.6a2 2 0 0 0 2.8 2.8"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 8.5 4 9.5 8a11.8 11.8 0 0 1-3.1 5.1M6.1 6.1C3.9 7.6 2.6 10 2.5 12c.5 2 2.1 4.2 4.5 5.9A10.8 10.8 0 0 0 12 20c1 0 2-.1 2.9-.4"
                          />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-[18px] w-[18px]"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.5 12S6 4 12 4s9.5 8 9.5 8-3.5 8-9.5 8-9.5-8-9.5-8Z"
                          />

                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-950/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="opacity-25"
                        />

                        <path
                          d="M21 12a9 9 0 0 1-9 9"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>

                      Signing in...
                    </>
                  ) : (
                    <>
                      Admin sign in

                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14M13 6l6 6-6 6"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Customer login */}
              <div className="mt-5 text-center text-xs text-neutral-500">
                Customer account?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-950"
                >
                  Customer login
                </Link>
              </div>

              {/* Demo credentials */}
              <div className="mt-5 rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-neutral-500 ring-1 ring-neutral-200">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />

                      <path
                        strokeLinecap="round"
                        d="M12 10v6M12 7h.01"
                      />
                    </svg>
                  </span>

                  <div className="min-w-0 text-[11px] leading-5 text-neutral-500">
                    <span className="font-semibold text-neutral-700">
                      Demo admin:
                    </span>{' '}
                    admin@nova-store.com · admin123
                  </div>
                </div>
              </div>
            </div>

            {/* Back to store */}
            <div className="mt-4 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 transition hover:text-neutral-700"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 12H5M11 18l-6-6 6-6"
                  />
                </svg>

                Back to store
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminLoginPage;