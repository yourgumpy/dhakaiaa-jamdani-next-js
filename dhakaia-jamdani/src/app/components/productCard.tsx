import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { addToCart, addToFavorites, syncCart, syncFavorites } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";

const ProductCard = ({ props }: { props: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { product } = props;
  console.log("product", product);
  const pPrice = product.price - (product.price * product.discount) / 100;
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToFavorites = async () => {
    setIsLiked(!isLiked);
    dispatch(addToFavorites(product));
    await dispatch(syncFavorites()).unwrap();
  };
  
  const handleAddToCart = async () => {
    dispatch(addToCart(product));
    await dispatch(syncCart()).unwrap();
  };
  return (
    <div 
      className="relative card card-compact bg-base-100 md:h-[470px] h-[350px] md:max-w-[380px] max-w-[320px] min-w-[280px] min-h-[270px] shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setShowSecondImage(true)}
      onMouseLeave={() => setShowSecondImage(false)}
    >
      <figure className="relative overflow-hidden">
        <div className="relative w-full h-full transition-transform duration-500 ease-in-out">
          <Image
            height={300}
            width={400}
            style={{ 
              objectFit: "cover",
              transition: "opacity 0.5s ease-in-out",
              opacity: showSecondImage ? 0 : 1,
            }}
            src={product.image_urls[0]}
            alt={product.title}
            className="max-h-96 absolute top-0 left-0"
          />
          <Image
            height={300}
            width={400}
            style={{ 
              objectFit: "cover",
              transition: "opacity 0.5s ease-in-out",
              opacity: showSecondImage ? 1 : 0,
            }}
            src={product.image_urls[1]}
            alt={product.title}
            className="max-h-96"
          />
        </div>
      </figure>

      {product.discount > 0 && (
        <div 
          className="absolute top-5 left-5 bg-cyan-600 p-2 pl-3 pr-3 rounded-full text-white transform transition-transform duration-300 hover:scale-110 hover:rotate-12"
        >
          -{product.discount}%
        </div>
      )}

      <button 
        onClick={handleAddToFavorites} 
        className="bg-white absolute top-5 p-2 rounded-full md:left-80 left-[260px] transition-transform duration-300 hover:scale-110"
      >
        <Image
          src={isLiked ? "/images/heart-fill.png" : "/images/heart-no-fill.png"}
          alt="Add to wishlist"
          height={30}
          width={30}
          style={{ cursor: "pointer" }}
          className="transition-transform duration-300"
        />
      </button>

      <div 
        className="card-body bg-cyan-800 rounded-2xl absolute md:top-[370px] top-[270px] w-full h-[100px] transition-all duration-300 group-hover:h-[120px]"
      >
        <div className="text-white flex justify-between items-center">
          <div className="transform transition-all duration-300 hover:translate-y-[-5px]">
            <Link href={`product/${encodeURIComponent(product.id)}`}>
              <h2 className="card-title hover:text-cyan-300 transition-colors duration-300">
                {product.title}
              </h2>
            </Link>
            <div className="flex items-center gap-2">
              {product.discount > 0 && (
                <span className="text-gray-300 line-through text-sm">
                  ${product.price}
                </span>
              )}
              <p className="text-white font-bold">${pPrice}</p>
            </div>
          </div>
          <div 
            className="transform transition-all duration-300 hover:scale-110"
            onClick={handleAddToCart}
          >
            <Image
              src="/images/add-cart.png"
              alt="Add to cart"
              height={50}
              width={50}
              style={{ cursor: "pointer" }}
              className="bg-white p-2 rounded-full hover:bg-cyan-100 transition-colors duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;