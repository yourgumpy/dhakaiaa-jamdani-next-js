"use client";
import React, { useState, useEffect } from "react";

interface Product {
  title: string;
  description: string;
  category: string;
  availability: string;
  price: number;
  discount: number;
  image_urls: string[];
}

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  mode?: "view" | "edit";
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  mode = "view",
}) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    availability: string;
    price: number;
    discount: number;
    image_urls: string[];
  }>({
    title: "",
    description: "",
    category: "",
    availability: "",
    price: 0,
    discount: 0,
    image_urls: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        category: product.category || "",
        availability: product.availability || "in-stock",
        price: product.price || 0,
        discount: product.discount || 0,
        image_urls: product.image_urls || [],
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataObj = new FormData();

    // Append all form fields
    (Object.keys(formData) as (keyof typeof formData)[]).forEach((key) => {
      if (key !== "image_urls") {
        formDataObj.append(key, formData[key].toString());
      }
    });

    // You'll need to implement updateProduct function similar to addProduct
    // await updateProduct(formDataObj, product.id);
    setIsEditing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">
          {isEditing ? "Edit Product" : "Product Details"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="label">Title</label>
                <input
                  type="text"
                  name="title"
                  className="input input-bordered w-full"
                  value={formData.title}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>

              <div>
                <label className="label">Description</label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered w-full"
                  value={formData.description}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  rows={3}
                />
              </div>

              <div>
                <label className="label">Category</label>
                <input
                  type="text"
                  name="category"
                  className="input input-bordered w-full"
                  value={formData.category}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="label">Availability</label>
                <select
                  name="availability"
                  className="select select-bordered w-full"
                  value={formData.availability}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value="in-stock">In Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="label">Price</label>
                <input
                  type="number"
                  name="price"
                  className="input input-bordered w-full"
                  value={formData.price}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>

              <div>
                <label className="label">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  className="input input-bordered w-full"
                  value={formData.discount}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Image Preview */}
          {formData.image_urls && formData.image_urls.length > 0 && (
            <div className="mt-4">
              <label className="label">Product Images</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.image_urls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="modal-action">
            {!isEditing ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Product
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {setIsEditing(false)}}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
