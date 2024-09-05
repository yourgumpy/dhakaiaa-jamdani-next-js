import React from "react";
import DualRangeSlider from "./DualRangeSlider";

const LeftBar = () => {
  const category = ["Sharee", "Panjabi", "Three Pieces"];
  return (
    <div className="lg:max-w-[300px] max-w-[300px]">
      <p className="lg:text-2xl text-xl font-bold pb-4 pl-6">Filter Option</p>

      {/* Category Filter Section Start */}
      <div className="collapse collapse-arrow border-gray-300 bg-base-100 border-2 m-4">
        <input type="checkbox" />
        <div className="collapse-title lg:text-xl text-lg font-medium">Category</div>
        <div className="collapse-content">
          {category.map((item, index) => (
            <div className="flex justify-start items-center cursor-pointer" key={index}>
              <label className="lg:text-lg text-md pl-2 border-2 border-gray-300 rounded-full p-2 mb-2 pr-7">
                <input type="checkbox" className="checkbox checkbox-xs" />
                <span className="pl-2">{item}</span>
              </label>
            </div>)
          )}
        </div>
      </div>
      {/* Category Filter Section End */}

      {/* Price Filter Section Start */}
      <div className="collapse collapse-arrow border-gray-300 bg-base-100 border-2 m-4">
        <input type="checkbox" />
        <div className="collapse-title lg:text-xl text-lg font-medium">Price</div>
        <div className="collapse-content">
          <DualRangeSlider />
        </div>
      </div>
      {/* Price Filter Section End */}

      {/* Availbility Sextion start */}
      <div className="collapse collapse-arrow border-gray-300 bg-base-100 border-2 m-4">
        <input type="checkbox" />
        <div className="collapse-title lg:text-xl text-lg font-medium">Availbility</div>
        <div className="collapse-content">
          <div className="flex justify-start items-center cursor-pointer">
            <label className="lg:text-lg text-md pl-2 border-2 border-gray-300 rounded-full p-2 mb-2 pr-7">
              <input type="radio" name="stock" className="radio radio-xs" />
              <span className="pl-2">In Stock</span>
            </label>
          </div>

          <div className="flex justify-start items-center cursor-pointer">
            <label className="lg:text-lg text-md pl-2 border-2 border-gray-300 rounded-full p-2 mb-2 pr-7">
              <input type="radio" name="stock" className="radio radio-xs" />
              <span className="pl-2">Out of Stock</span>
            </label>
          </div>
        </div>
      </div>
      {/* Availbility Sextion end */}

    </div>
  );
};

export default LeftBar;
