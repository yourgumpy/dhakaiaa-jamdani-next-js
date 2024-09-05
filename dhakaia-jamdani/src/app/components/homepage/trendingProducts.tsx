"use client";
import React, { useEffect } from "react";
import ProductCard from "../productCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/slices/productSlices";

const TrendingProducts = () => {
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
    <div className="p-10">
      <h1 className="md:text-4xl text-3xl pb-2 md:text-left text-center md:pl-32 text-red-500 font-bold">Trending Products for You!</h1>
      <div className="flex justify-start md:pl-32">
        <hr className="border-t-2 border-red-400 w-96" />
      </div>
      <div className="flex justify-center pt-10">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product:any, index:any) => (
            <ProductCard key={index} props={{ product }} />
          ))}
        </div>
      </div>
    </div>


  );
};

export default TrendingProducts;
