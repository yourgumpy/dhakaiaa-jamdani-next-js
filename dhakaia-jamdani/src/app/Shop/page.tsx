"use client";
import { Suspense } from 'react';
import EnhancedShopSection from '../components/ShopPage/EnhancedShopSection';

const Shop = () => {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <EnhancedShopSection />
    </Suspense>
  );
};

export default Shop;