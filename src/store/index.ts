import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import categoryReducer from './slices/categorySlice';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productSlice';
import uiReducer from './slices/uiSlice';
import wishlistReducer from './slices/wishlistSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        categories: categoryReducer,
        orders: orderReducer,
        products: productReducer,
        ui: uiReducer,
        wishlist: wishlistReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;