"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import LeftBar from "../components/ShopPage/LeftBar";
import TopBar from "../components/ShopPage/TopBar";
import { useDispatch } from "react-redux";
import { fetchProducts, setFilters } from "@/app/slices/productSlices";
import { useSearchParams, useRouter } from "next/navigation";

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Set up sort state
  const [currentSort, setCurrentSort] = useState("default");

  useEffect(() => {
    // Initial fetch of products
    dispatch(fetchProducts() as any);
    
    // Get any existing filters from URL
    const category = searchParams.getAll('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const availability = searchParams.getAll('availability');
    
    // Update Redux filters
    const filters = {
      category: category.length > 0 ? category : [],
      minPrice: minPrice ? parseInt(minPrice) : 0,
      maxPrice: maxPrice ? parseInt(maxPrice) : 10000,
      availability: availability.length > 0 ? availability : [],
    };
    
    dispatch(setFilters(filters));
  }, [dispatch, searchParams]);

  // Handle sort option change
  const handleSortChange = (sortOption: string) => {
    setCurrentSort(sortOption);
    
    // Update URL with sort parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sortOption);
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative w-full h-64">
        <Image
          src="/images/Do-Shopping.png"
          alt="Do Shopping"
          width={1920}
          height={1080}
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-sans font-bold">Do Your Shopping</h1>
          <p className="text-base md:text-lg mt-2 max-w-md text-center px-4">
            Explore our collection and find something special
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[300px] flex justify-center p-5 pt-10">
        {/* Left Sidebar - Desktop */}
        <div className="lg:block hidden">
          <LeftBar />
        </div>
        
        {/* Main Content with TopBar */}
        <div className="grid lg:pl-10 w-full max-w-6xl">
          <Suspense fallback={<div>Loading product filters...</div>}>
            <TopBarWrapper onSortChange={handleSortChange} />
          </Suspense>
          
          {/* Children with sort props */}
          <div className="mt-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper for TopBar to add the onSortChange prop
const TopBarWrapper = ({ onSortChange }: { onSortChange: (sortOption: string) => void }) => {
  return <TopBar onSortChange={onSortChange} />;
};

export default ShopLayout;