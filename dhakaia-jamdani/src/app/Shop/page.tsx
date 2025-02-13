"use client";
import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import ShopSection with no SSR since it uses client-side features
const ShopSection = dynamic(() => import('../components/ShopPage/ShopSection'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

const Shop = () => {
  return <ShopSection />
}

export default Shop