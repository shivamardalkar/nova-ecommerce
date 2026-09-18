import { useEffect } from 'react';

import { AppRoutes } from '@/routes';
import { useAppDispatch } from '@/store/hooks';
import { restoreSession } from '@/store/slices/authSlice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;
