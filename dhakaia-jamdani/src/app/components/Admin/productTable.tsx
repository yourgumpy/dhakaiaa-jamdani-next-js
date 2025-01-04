"use client"
import { getAllProducts } from "@/app/Admin/AllProducts/action";
import React, { useEffect, useState } from "react";

const ProductTable = () => {
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
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.availability}</td>
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
