"use client"
import { fetchProducts } from "@/app/slices/productSlices";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductTable = () => {
    const { products, status, error } = useSelector(
        (state: any) => state.products
    );
    const [searchedProducts, setSearchedProducts] = useState(products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts() as any);
    }, [dispatch]);
    return (
        <div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="text-xl">
                        <tr>
                            <th>SL No</th>
                            <th>Title</th>
                            <th>Availability</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody className="text-lg">
                    {status === "loading" && <div>Loading...</div>}
                    {status === "failed" && <div>Error: {error}</div>}
                        {status === "succeeded" &&
                            products.length > 0 &&
                            products.map((product: any, index: any) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{product.title}</td>
                                    <td>{product.inStock == true ? "In Stock" : "Out of Stock"}</td>
                                    <td>{product.price}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductTable
