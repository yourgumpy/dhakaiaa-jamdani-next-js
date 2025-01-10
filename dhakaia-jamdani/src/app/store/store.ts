import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../slices/productSlices';
import cartReducer from '../slices/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
