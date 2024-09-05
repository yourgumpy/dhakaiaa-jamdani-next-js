"use client";
import React, { useEffect } from "react";
import ProductCard from "../productCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../slices/productSlices";

const ShopSection = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector(
    (state: any) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="container">
        <div className="flex justify-center pt-10">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product: any, index: any) => (
              <ProductCard key={index} props={{ product }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSection;
