"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../productCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/slices/productSlices";
import Link from "next/link";

const TrendingProducts = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state: any) => state.products);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts() as any); 
    }
  }, [status, dispatch]);

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
      <div className="flex justify-center mt-8">
        <Link 
          href="/Shop" 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default TrendingProducts;