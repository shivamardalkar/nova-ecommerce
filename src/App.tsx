import { useEffect } from 'react';

import { AppRoutes } from '@/routes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCurrentUser } from '@/store/selectors/authSelectors';
import { clearUserCart, loadUserCart } from '@/store/slices/cartSlice';
import { clearUserWishlist, loadUserWishlist } from '@/store/slices/wishlistSlice';
import { restoreSession } from '@/store/slices/authSlice';

const App = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(loadUserCart(currentUser.id));
      dispatch(loadUserWishlist(currentUser.id));

      return;
    }

    dispatch(clearUserCart());
    dispatch(clearUserWishlist());
  }, [currentUser, dispatch]);

  return <AppRoutes />;
};

export default App;
