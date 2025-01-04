// slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { supabase } from '../utils/supabase/supabaseClient';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const products = await supabase.from('products').select('*'); 
  return products;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || "Error In Fetching Products";
      });
  },
});

export default productsSlice.reducer;
