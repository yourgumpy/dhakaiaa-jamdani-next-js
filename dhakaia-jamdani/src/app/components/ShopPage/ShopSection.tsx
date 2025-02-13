"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from 'next/navigation';
import { fetchProducts, setFilters } from "../../slices/productSlices";
import ProductCard from "../productCard";
import { Suspense } from "react";

const SearchParamsWrapper = ({ onFiltersChange }: { onFiltersChange: (filters: any) => void }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.getAll('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const availability = searchParams.get('availability');

    const newFilters = {
      category: category.length > 0 ? category : [],
      minPrice: minPrice ? parseInt(minPrice) : 0,
      maxPrice: maxPrice ? parseInt(maxPrice) : 10000,
      availability: availability as 'in-stock' | 'out-of-stock' | undefined,
    };

    onFiltersChange(newFilters);
  }, [searchParams, onFiltersChange]);

  return null;
};

const ShopSection = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state: any) => state.products);

  const handleFiltersChange = (filters: any) => {
    dispatch(setFilters(filters));
    dispatch(fetchProducts(filters) as any);
  };

  return (
    <div className="container">
      <Suspense fallback={<div>Loading filters...</div>}>
        <SearchParamsWrapper onFiltersChange={handleFiltersChange} />
      </Suspense>

      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error: {error}</div>}

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
