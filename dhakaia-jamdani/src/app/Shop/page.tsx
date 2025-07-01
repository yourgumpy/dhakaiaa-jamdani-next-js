"use client";
import { Suspense } from 'react';
import ShopSection from '../components/ShopPage/ShopSection';

const Shop = () => {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ShopSection />
    </Suspense>
  );
};

export default Shop;