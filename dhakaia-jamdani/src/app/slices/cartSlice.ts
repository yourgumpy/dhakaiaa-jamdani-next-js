// slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productSlices"; // Import Product type from productsSlice

interface CartState {
  cart: { id: number; quantity: number }[]; // Store product IDs and quantities
  favorites: number[]; // Store product IDs for favorites
}

const initialState: CartState = {
  cart: [],
  favorites: [],
};

// Utility function to get cart data from localStorage (for non-logged-in users)
const loadCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    // Check if on the client side
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromLocalStorage(), // Initialize cart from localStorage
    favorites: [] as number[],
  },
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingProduct = state.cart.find(
        (item: any) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product exists
      } else {
        state.cart.push({ id: product.id, quantity: 1 }); // Add new product by ID
      }

      // Update localStorage for persistence (non-logged-in users)
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item: any) => item.id !== productId);
      // Update localStorage after removing an item
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      if (!state.favorites.includes(product.id)) {
        state.favorites.push(product.id); // Add product to favorites by ID
      }
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify([])); // Clear cart from localStorage
    },
  },
});

export const { addToCart, removeFromCart, addToFavorites, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
