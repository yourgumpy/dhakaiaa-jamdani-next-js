"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../productCard";
import { getAllProducts } from "@/app/Admin/AllProducts/action";

const TrendingProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  
      useEffect(() => {
          const fetchProducts = async () => {
              const prods = await getAllProducts();
              if (prods) {
                  setProducts(prods);
              }
          };
          fetchProducts();
      },[products])


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
