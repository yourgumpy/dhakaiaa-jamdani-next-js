"use client";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components that use searchParams
const ShopSection = dynamic(() => import('../components/ShopPage/ShopSection'), {
  ssr: false,
  loading: () => <div>Loading products...</div>
});

const Shop = () => {
  return (
    <div>
      {/* Wrap ALL searchParams-dependent components in Suspense */}
      <Suspense fallback={<div>Loading filters...</div>}>
        <ShopSection />
      </Suspense>
    </div>
  );
};

export default Shop;