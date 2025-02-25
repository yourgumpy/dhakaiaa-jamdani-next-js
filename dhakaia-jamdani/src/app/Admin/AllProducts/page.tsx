"use client";
import ProductTable from "@/app/components/Admin/productTable";
import Sidebar from "@/app/components/Admin/Sidebar";
import React from "react";

const Page = () => {

  return (
    <div className="container pt-24">
      <div className="lg:hidden pl-5">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex gap-1 font-bold pt-2 pb-3">
            <label htmlFor="my-drawer">
              <span className="material-icons">menu_open</span>
            </label>
            <label htmlFor="my-drawer">Admin Panel</label>
          </div>
          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-2 pr-10 pt-24">
              <Sidebar />
            </ul>
          </div>
        </div>
      </div>
      <p className="text-3xl font-bold pl-5">Products</p>
      <hr className="border-1 border-red-400" />
      
      <ProductTable />
    </div>
  );
};

export default Page;
