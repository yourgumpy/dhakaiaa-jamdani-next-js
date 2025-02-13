"use client";
import { Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DualRangeSlider from "./DualRangeSlider";

const LeftBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = ["Sharee", "Panjabi", "Threepcs"];

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (name === "category") {
        const categories = params.getAll("category");
        if (categories.includes(value)) {
          // Remove category if already selected
          params.delete("category");
          categories
            .filter((cat) => cat !== value)
            .forEach((cat) => params.append("category", cat));
        } else {
          // Add new category
          params.append("category", value);
        }
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="lg:max-w-[300px] max-w-[300px]">
      <p className="lg:text-2xl text-xl font-bold pb-4 pl-6">Filter Option</p>

      <div className="collapse collapse-arrow border-gray-300 bg-base-100 border-2 m-4">
        <input type="checkbox" />
        <div className="collapse-title lg:text-xl text-lg font-medium">
          Category
        </div>
        <div className="collapse-content">
          {category.map((item, index) => (
            <div
              className="flex justify-start items-center cursor-pointer"
              key={index}
            >
              <label className="lg:text-lg text-md pl-2 border-2 border-gray-300 rounded-full p-2 mb-2 pr-7">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs"
                  checked={searchParams.getAll("category").includes(item)}
                  onChange={() => {
                    router.push("?" + createQueryString("category", item));
                  }}
                />
                <span className="pl-2">{item}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="collapse border-gray-300 bg-base-100 border-2 m-4">
        <Suspense fallback={<div>Loading price filter...</div>}>
          <DualRangeSlider />
        </Suspense>
      </div>

      <div className="collapse collapse-arrow border-gray-300 bg-base-100 border-2 m-4">
        <input type="checkbox" />
        <div className="collapse-title lg:text-xl text-lg font-medium">
          Availbility
        </div>
        <div className="collapse-content">
          <div className="flex justify-start items-center cursor-pointer">
            <label className="lg:text-lg text-md pl-2 border-2 border-gray-300 rounded-full p-2 mb-2 pr-7">
              <input
                type="radio"
                name="stock"
                className="radio radio-xs"
                checked={searchParams.get("availability") === "in-stock"}
                onChange={() => {
                  router.push(
                    "?" + createQueryString("availability", "in-stock")
                  );
                }}
              />
              <span className="pl-2">In Stock</span>
            </label>
          </div>

          <div className="flex justify-start items-center cursor-pointer">
            <label className="lg:text-lg text-md pl-2 border-2 border-gray-300 rounded-full p-2 mb-2 pr-7">
              <input
                type="radio"
                name="stock"
                className="radio radio-xs"
                checked={searchParams.get("availability") === "out-of-stock"}
                onChange={() => {
                  router.push(
                    "?" + createQueryString("availability", "out-of-stock")
                  );
                }}
              />
              <span className="pl-2">Out of Stock</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
