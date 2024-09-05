"use client";
import ProductTable from "@/app/components/Admin/productTable";
import { fetchProducts } from "@/app/slices/productSlices";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {

  return (
    <div className="container p-5 pt-24">
      <p className="text-3xl font-bold ">Products</p>
      <hr className="border-1 border-red-400" />
      
      <ProductTable />
    </div>
  );
};

export default Page;
