"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/slices/productSlices";
import ProductModal from "./showProductModal";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state: any) => state.products);
  const [editedProducts, setEditedProducts] = useState<{ [key: string]: any }>(
    {}
  );
  const [isEdited, setIsEdited] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts() as any); 
    }
  }, [status, dispatch]);

  const handleEdit = (
    productId: string,
    field: string,
    value: string | number
  ) => {
    setEditedProducts((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
    setIsEdited(true);
  };

  const handleSaveAll = async () => {
    try {
      console.log("Saving edited products:", editedProducts);
      setEditedProducts({});
      setIsEdited(false);
      // const updatedProducts = await getAllProducts();
      // setProducts([]);
    } catch (error) {
      console.error("Error saving products:", error);
    }
  };

  return (
    <div className="w-full h-full bg-base-100">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        {/* <h2 className="text-2xl font-bold">Products</h2> */}
        {isEdited && (
          <button
            onClick={handleSaveAll}
            className="btn btn-success w-full sm:w-auto"
          >
            Save All Changes
          </button>
        )}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full table-fixed">
          <thead className="text-base sm:text-lg bg-base-100">
            <tr>
              <th className="w-16">SL No</th>
              <th className="">Title</th>
              <th className="lg:block hidden">Availability</th>
              <th className="">Price</th>
              <th className="w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-base">
            {products.map((product:any, index:any) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td className="lg:block hidden">
                  <select
                    className="select select-bordered select-sm sm:select-md w-full max-w-xs"
                    value={
                      editedProducts[product.id]?.availability ??
                      product.availability
                    }
                    onChange={(e) =>
                      handleEdit(product.id, "availability", e.target.value)
                    }
                  >
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    className="input input-bordered input-sm sm:input-md w-full max-w-xs"
                    value={editedProducts[product.id]?.price ?? product.price}
                    onChange={(e) =>
                      handleEdit(product.id, "price", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                    }}
                    className="btn btn-primary btn-sm sm:btn-md"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ProductModal
          product={selectedProduct!}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      </div>
    </div>
  );
};

export default ProductTable;
