// slices/productsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../utils/supabase/supabaseClient';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const { data: products, error } = await supabase.from('products').select('*');
  if (error) {
    throw new Error(error.message); // Handle error if fetching fails
  }
  return products;
});

// Define the Product type (export it so it can be used elsewhere)
export interface Product {
  id: number;
  name: string;
  price: number;
  // Add other product fields here as needed
}

interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'; // Set loading state
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set succeeded state
        state.products = action.payload; // Store fetched products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'; // Set failed state
        state.error = action.error.message || 'Error fetching products';
      });
  },
});

export default productsSlice.reducer;
