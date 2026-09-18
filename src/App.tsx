import { useEffect } from 'react';

import AppRoutes from '@/routes/AppRoutes';
import { useAppDispatch } from '@/store/hooks';
import { restoreSession } from '@/store/slices/authSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;