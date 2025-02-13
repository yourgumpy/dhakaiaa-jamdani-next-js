"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearCart,
  initializeFromStorage,
  syncCart,
} from "@/app/slices/cartSlice";
import { fetchProducts } from "@/app/slices/productSlices"; // Make sure you have this action
import { Product } from "@/app/slices/productSlices";
import { X, ShoppingCart, SidebarClose, Loader } from "lucide-react";
import Link from "next/link";
import { AppDispatch, RootState } from "../store/store";
import Image from "next/image";

export default function FloatingCart() {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);
  const { products, status } = useSelector((state: any) => state.products);
  const [cartOpen, setCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Initialize cart from localStorage
    dispatch(initializeFromStorage());
    // Fetch products if not already loaded
    if (!products || products.length === 0) {
      dispatch(fetchProducts() as any);
    }
  }, [dispatch, products]);

  if (!isMounted) return null;

  // Handle loading state
  if (status === "loading" || !products) {
    return (
      <div className="fixed bottom-8 right-8 z-[100]">
        <button className="relative bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-lg">
          <Loader className="w-6 h-6 animate-spin" />
        </button>
      </div>
    );
  }

  // Map cart item IDs to full product details with null checks
const cartItems = Array.isArray(cart) 
  ? cart
    .map((item: { id: number; quantity: number }) => {
      const product = products?.find((p: Product) => p.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean)
  : [];

  const totalPrice = cartItems.reduce(
    (total: number, item: any) =>
      total + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  return (
    <>
      {/* Cart Button with Animation */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <button
          onClick={() => setCartOpen(true)}
          className="relative bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-lg transform transition-transform hover:scale-110"
        >
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[150]"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[200] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Cart Header */}
          <div className="p-4 border-b flex items-center justify-between bg-primary/5">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Your Cart
            </h2>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 hover:bg-primary/10 rounded-full transition-colors"
            >
              <SidebarClose className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <ShoppingCart className="w-16 h-16 mb-4" />
                <p className="text-lg">Your cart is empty</p>
              </div>
            ) : (
              <ul className="divide-y">
                {cartItems.map((item: any) => {
                  // Skip rendering if item or item.id is undefined/null
                  if (!item || !item.id) return null;

                  return (
                    <li
                      key={`cart-item-${item.id}`}
                      className="p-4 hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex gap-4">
                        <Image
                          src={
                            item.image_urls?.[1] || "/default-placeholder.png"
                          }
                          alt={item.title || "Product image"}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">
                            {item.title || "Unnamed product"}
                          </h3>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-primary">
                              $
                              {(
                                (item.price || 0) * (item.quantity || 1)
                              ).toFixed(2)}
                            </p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  dispatch(removeFromCart(item.id))
                                }
                                className="p-1 hover:bg-red-100 rounded-full text-red-500 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            Quantity: {item.quantity || 1}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 bg-primary/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg text-primary font-bold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="space-y-2">
                <Link href="/checkout">
                  {" "}
                  <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md transition-colors">
                    Checkout
                  </button>
                </Link>
                <button
                  onClick={() => {
                    dispatch(clearCart());
                    dispatch(syncCart());
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
