import Image from 'next/image';
import React from 'react'

const Section_1 = () => {
  const features = [
    {
      icon: '/images/fabric-pattern.png',
      title: 'Quality Fabric',
    },
    {
      icon: '/images/tag.png',
      title: 'Affordable Price',
    },
    {
      icon: '/images/click.png',
      title: 'Rich Collection',
    },
    {
      icon: '/images/shopping-cart.png',
      title: 'Hassle Free Shopping',
    },
  ];

  return (
    <section className='container mx-auto m-14 p-8 bg-base-200 rounded-md'>
      <h1 className="text-4xl font-bold text-center pb-6 text-red-500">What We Offer</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center items-center">
              <Image
              src={feature.icon}
              width={70}
              height={100}
              style={{ objectFit: 'cover' }}
              alt='icon'
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Section_1
