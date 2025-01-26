import React, { useState } from "react";

const Favorites = () => {
  // Simulated favorites data - replace with actual data fetching
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 99.99,
      image: "/api/placeholder/100/100",
    },
    {
      id: 2,
      name: "Product 2",
      price: 149.99,
      image: "/api/placeholder/100/100",
    },
    {
      id: 3,
      name: "Product 3",
      price: 199.99,
      image: "/api/placeholder/100/100",
    },
  ]);
  return (
    <div className="card-body">
      <h2 className="card-title">Your Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((item) => (
          <div key={item.id} className="card bg-base-200">
            <figure className="px-4 pt-4">
              <img
                src={item.image}
                alt={item.name}
                className="rounded-xl h-32 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-lg">{item.name}</h3>
              <p className="text-base-content/60">${item.price}</p>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
