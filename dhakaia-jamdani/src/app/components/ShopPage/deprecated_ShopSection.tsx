"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchProducts, setFilters } from "../../slices/productSlices";
import ProductCard from "../productCard";

const ITEMS_PER_PAGE = 20;

const ShopSectionContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, status, error, filters } = useSelector(
    (state: any) => state.products
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [displayProducts, setDisplayProducts] = useState<any[]>([]);

  useEffect(() => {
    // Parse URL parameters
    const category = searchParams.getAll("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const availability = searchParams.getAll("availability");
    const page = searchParams.get("page");
    const sort = searchParams.get("sort");

    // Update current page from URL
    if (page) {
      setCurrentPage(parseInt(page));
    }

    // Update Redux filters
    const newFilters = {
      category: category.length > 0 ? category : [],
      minPrice: minPrice ? parseInt(minPrice) : 0,
      maxPrice: maxPrice ? parseInt(maxPrice) : 10000,
      availability: availability as any as "in-stock" | "out-of-stock" | undefined,
    };

    dispatch(setFilters(newFilters));
    dispatch(fetchProducts(newFilters) as any);
  }, [searchParams, dispatch]);

  // Apply sorting and pagination when products change
  useEffect(() => {
    if (!products || products.length === 0) return;

    // Get the current sort option
    const sortType = searchParams.get("sort") || "default";

    // Apply sorting
    let sortedProducts = [...products];

    switch (sortType) {
      case "priceHighToLow":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "priceLowToHigh":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "rating":
        sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Default sorting (keep original order)
        break;
    }

    // Calculate pagination
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Update display products
    setDisplayProducts(sortedProducts.slice(startIndex, endIndex));
  }, [products, searchParams, currentPage]);

  const totalPages = Math.ceil((products?.length || 0) / ITEMS_PER_PAGE);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    // Create new URLSearchParams object
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    // Update URL with new page parameter
    router.push(`?${params.toString()}`);
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="container">
      <div className="flex flex-col items-center gap-8 pt-6">
        {/* Products Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {displayProducts.length > 0 ? (
            displayProducts.map((product: any, index: number) => (
              <ProductCard key={`${product.id}-${index}`} props={{ product }} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="join pb-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="join-item btn"
            >
              «
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`join-item btn ${
                  currentPage === page ? "btn-active" : ""
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="join-item btn"
            >
              »
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
