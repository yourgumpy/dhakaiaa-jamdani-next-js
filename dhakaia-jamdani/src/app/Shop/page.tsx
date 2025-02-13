
import React, { Suspense } from 'react'
import ShopSection from '../components/ShopPage/ShopSection'

const Shop = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}/>
      <ShopSection/>
      <Suspense/>
    </div>
  )
}

export default Shop
