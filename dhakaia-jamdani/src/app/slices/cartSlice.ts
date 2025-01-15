// cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productSlices";

interface CartState {
  cart: { id: number; quantity: number }[];
  favorites: number[];
  isInitialized?: boolean;
}

const initialState: CartState = {
  cart: [],
  favorites: [],
  isInitialized: false,
};

const loadCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    const favorites = localStorage.getItem("favorites");
    console.log(cart, favorites);
    return {
      cart: cart ? JSON.parse(cart) : [],
      favorites: favorites ? JSON.parse(favorites) : [],
    };
  }
  return { cart: [], favorites: [] };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    initializeFromStorage: (state) => {
      if (!state.isInitialized && typeof window !== "undefined") {
        const cart = localStorage.getItem("cart");
        const favorites = localStorage.getItem("favorites");
        state.cart = cart ? JSON.parse(cart) : [];
        state.favorites = favorites ? JSON.parse(favorites) : [];
        state.isInitialized = true;
      }
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ id: product.id, quantity: 1 });
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.cart = state.cart.filter(
        (item: { id: number; quantity: number }) => item.id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const index = state.favorites.indexOf(product.id);

      if (index === -1) {
        state.favorites.push(product.id);
      } else {
        state.favorites.splice(index, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const item = state.cart.find(
        (item: { id: number; quantity: number }) => item.id === productId
      );
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const item = state.cart.find(
        (item: { id: number; quantity: number }) => item.id === productId
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const {
  initializeFromStorage,
  addToCart,
  removeFromCart,
  addToFavorites,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
