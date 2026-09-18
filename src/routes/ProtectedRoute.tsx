import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';
import {
  selectIsAuthenticated,
  selectIsAuthInitialized,
} from '@/store/selectors/authSelectors';

const ProtectedRoute = () => {
  const location = useLocation();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectIsAuthInitialized);

  if (!isInitialized) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;