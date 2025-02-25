"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchProducts, setFilters } from "../../slices/productSlices";
import ProductCard from "../productCard";

const ITEMS_PER_PAGE = 20;

const ShopSectionContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, status, error, filters } = useSelector((state: any) => state.products);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  useEffect(() => {
    // Parse URL parameters
    const category = searchParams.getAll('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const availability = searchParams.get('availability');
    const page = searchParams.get('page');

    // Update current page from URL
    if (page) {
      setCurrentPage(parseInt(page));
    }

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

  // Calculate pagination indexes
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    
    // Create new URLSearchParams object
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    
    // Update URL with new page parameter
    router.push(`?${params.toString()}`);
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="container">
      <div className="flex flex-col items-center gap-8 pt-10">
        {/* Products Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {currentProducts.map((product: any, index: number) => (
            <ProductCard key={`${product.id}-${index}`} props={{ product }} />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2 pb-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Wrapper component with Suspense
const ShopSection = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopSectionContent />
    </Suspense>
  );
};

export default ShopSection;