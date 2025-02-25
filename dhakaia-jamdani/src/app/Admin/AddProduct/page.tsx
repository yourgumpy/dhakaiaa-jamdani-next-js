"use client";
import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image";
import React, { useState } from "react";
import clsx from "clsx";
import Sidebar from "@/app/components/Admin/Sidebar";
import loader from "@/app/components/loaders/loader";
import { addProduct } from "./action";

const Page = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Sharee");
  const [availability, setAvailability] = useState("in-stock");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const categories = ["Sharee", "Panjabi", "Threepcs"];
  const box_css = clsx("mt-7 rounded-lg p-2 md:w-[600px] w-full", {
    "w-[550px] bg-gray-100": theme === "light",
    "w-[550px] bg-[#363a41]": theme === "dark",
  });

  const box_css_2 = clsx("mt-7 rounded-lg p-2 md:w-[290px] w-full", {
    "w-[550px] bg-gray-100": theme === "light",
    "w-[550px] bg-[#363a41]": theme === "dark",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedPhotos((prevFiles: File[]) => [...prevFiles, ...files]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("inStock", availability);
      formData.append("price", price.toString());
      formData.append("discount", discount.toString());

      selectedPhotos.forEach((photo) => {
        formData.append("images", photo);
      });

      await addProduct(formData)

      alert("Product added successfully!");
      // Reset form fields if needed
      setTitle("");
      setDescription("");
      setSelectedPhotos([]);
      setPrice(0);
      setDiscount(0);
      setLoading(false);
      console.log("done");
    } catch (error) {
      console.error("Error adding product:", error);
      setLoading(false);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="container p-5 pt-24">
      <div className="lg:hidden">
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
      <div className="flex justify-center items-center">
        <div className="grid items-center">
          <p className="text-3xl font-bold ">Add a New Product</p>
          <hr className="border-1 border-red-400" />
          <div className="lg:flex justify-evenly gap-4">
            {/* basic info */}
            <div className={box_css}>
              <p className="text-xl font-bold pl-5 pt-3">Basic Information</p>
              <div className="border-[1px] border-gray-400 m-4 p-3 rounded-lg">
                <p className="text-lg pb-2">Product Title</p>
                <input
                  type="text"
                  value={title}
                  placeholder="Type here"
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered border-[2px] w-full bg-inherit"
                />

                <p className="text-lg pb-2 pt-5">Product Description</p>
                <textarea
                  rows={4}
                  value={description}
                  placeholder="Write something about your product"
                  className="textarea textarea-bordered border-[2px] w-full bg-inherit"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            {loading && loader()}
            <div>
              {/* Upload Photos Section */}
              <div className={box_css}>
                <p className="text-xl font-bold pl-5 pt-3">Upload Image</p>
                <div className="border-[1px] border-gray-400 m-4 p-3 rounded-lg flex overflow-x-auto scroll-auto">
                  {selectedPhotos.length > 0 &&
                    selectedPhotos.map((photo, index) => (
                      <div key={index}>
                        <span
                          className="material-icons text-red-600 cursor-pointer absolute pl-12"
                          onClick={() =>
                            setSelectedPhotos(
                              selectedPhotos.filter((_, i) => i !== index)
                            )
                          }
                        >
                          delete_forever
                        </span>
                        <Image
                          src={URL.createObjectURL(photo)}
                          alt="product"
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg mr-2"
                        />
                      </div>
                    ))}
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center min-w-20 h-20 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer"
                  >
                    <div className="text-center">
                      <p className="text-gray-500 text-xl">+</p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              {/* category */}
              <div className={box_css}>
                <p className="text-xl font-bold pl-5 pt-3">Product Category</p>
                <div className="border-[1px] border-gray-400 m-4 p-3 rounded-lg">
                  <p className="text-lg pb-2">Select Category</p>
                  <select
                    className="select select-bordered w-full"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((cat, index) => (
                      <option key={index}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* stock / availability */}
          <div className="lg:flex justify-evenly gap-4">
            <div className="flex justify-evenly gap-4">
              <div className={box_css_2}>
                <div className="text-xl font-bold pl-5 pt-3">Availability</div>
                <div className="border-[1px] border-gray-400 m-4 p-3 rounded-lg">
                  <select
                    className="select w-full"
                    onChange={(e) => setAvailability(e.target.value)}
                  >
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
              </div>
              <div className={box_css_2}>
                <p className="text-xl font-bold pl-5 pt-3">Discount(%)</p>
                <div className="border-[1px] border-gray-400 m-4 p-3 rounded-lg">
                  <input
                    type="number"
                    placeholder="Type here"
                    value={discount}
                    className="input border-[2px] w-full bg-inherit"
                    onChange={(e) => setDiscount(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* price */}
            <div className={box_css}>
              <p className="text-xl font-bold pl-5 pt-3">Product Price</p>
              <div className="border-[1px] border-gray-400 m-4 p-3 rounded-lg">
                <input
                  type="number"
                  placeholder="Type here"
                  value={price}
                  className="input border-[2px] w-full bg-inherit"
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="btn bg-red-500 lg:w-28 lg:m-2 w-full mt-2"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
