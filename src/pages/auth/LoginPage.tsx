import { FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError, login } from '@/store/slices/authSlice';
import {
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
  selectCurrentUser,
} from '@/store/selectors/authSelectors';

const LoginPage = () => {
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

    const from = location.state?.from?.pathname;

    if (currentUser.role === 'admin') {
      navigate(from?.startsWith('/admin') ? from : '/admin', {
        replace: true,
      });
      return;
    }

    navigate(from || '/', { replace: true });
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
      }),
    );
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-neutral-500">
            NOVA Store
          </p>

          <h1 className="text-3xl font-bold text-neutral-900">Welcome back</h1>

          <p className="mt-2 text-sm text-neutral-600">Sign in to continue shopping.</p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-800">
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-neutral-800">
              Password
            </label>

            <input
              id="password"
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
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-neutral-900 underline underline-offset-4"
          >
            Create one
          </Link>
        </div>

        <div className="mt-8 rounded-lg bg-neutral-50 p-4 text-xs text-neutral-600">
          <p className="font-semibold text-neutral-800">Demo customer account</p>
          <p className="mt-1">Email: aarav@example.com</p>
          <p>Password: password123</p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
