import { FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError, register } from '@/store/slices/authSlice';
import {
  selectAuthError,
  selectAuthLoading,
  selectCurrentUser,
  selectIsAuthenticated,
} from '@/store/selectors/authSelectors';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

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

    setValidationError(null);

    if (!name.trim()) {
      setValidationError('Please enter your name.');
      return;
    }

    if (!email.trim()) {
      setValidationError('Please enter your email address.');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }

    await dispatch(
      register({
        name: name.trim(),
        email: email.trim(),
        password,
      }),
    );
  };

  const displayedError = validationError || error;

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-neutral-500">
            NOVA Store
          </p>

          <h1 className="text-3xl font-bold text-neutral-900">Create your account</h1>

          <p className="mt-2 text-sm text-neutral-600">Register to start shopping.</p>
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
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-neutral-800">
              Full name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              required
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200"
            />
          </div>

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
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Minimum 6 characters"
              required
              minLength={6}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-neutral-800"
            >
              Confirm password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Re-enter your password"
              required
              minLength={6}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-neutral-900 px-4 py-3 font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-neutral-900 underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
