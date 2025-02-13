"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchProducts, setFilters } from "../../slices/productSlices";
import ProductCard from "../productCard";

const ShopSection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, status, error, filters } = useSelector((state: any) => state.products);

  useEffect(() => {
    // Parse URL parameters
    const category = searchParams.getAll('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const availability = searchParams.get('availability');

    // Update Redux filters
    const newFilters = {
      category: category.length > 0 ? category : [],
      minPrice: minPrice ? parseInt(minPrice) : 0,
      maxPrice: maxPrice ? parseInt(maxPrice) : 10000,
      availability: availability as 'in-stock' | 'out-of-stock' | undefined,
    };

    dispatch(setFilters(newFilters));
    dispatch(fetchProducts(newFilters) as any);
  }, [searchParams, dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="container">
      <div className="flex justify-center pt-10">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product: any, index: any) => (
            <ProductCard key={index} props={{ product }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopSection;