import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';
import {
  selectIsAdmin,
  selectIsAuthInitialized,
  selectIsAuthenticated,
} from '@/store/selectors/authSelectors';

const AdminRoute = () => {
  const location = useLocation();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectIsAuthInitialized);
  const isAdmin = useAppSelector(selectIsAdmin);

  if (!isInitialized) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
