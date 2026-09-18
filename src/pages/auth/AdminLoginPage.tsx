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

  const displayedError = error;

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-neutral-500">
            NOVA Store
          </p>

          <h1 className="text-3xl font-bold text-neutral-900">Admin Portal</h1>

          <p className="mt-2 text-sm text-neutral-600">
            Sign in to access the administration dashboard.
          </p>
        </div>

        {displayedError && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {displayedError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-2 block text-sm font-medium text-neutral-800"
            >
              Admin email
            </label>

            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm font-medium text-neutral-800"
            >
              Password
            </label>

            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-neutral-900 px-4 py-3 font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Signing in...' : 'Admin sign in'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-600">
          Customer account?{' '}
          <Link to="/login" className="font-semibold text-neutral-900 underline underline-offset-4">
            Customer login
          </Link>
        </div>

        <div className="mt-8 rounded-lg bg-neutral-50 p-4 text-xs text-neutral-600">
          <p className="font-semibold text-neutral-800">Demo admin account</p>
          <p className="mt-1">Email: admin@nova-store.com</p>
          <p>Password: admin123</p>
        </div>
      </section>
    </main>
  );
};

export default AdminLoginPage;
