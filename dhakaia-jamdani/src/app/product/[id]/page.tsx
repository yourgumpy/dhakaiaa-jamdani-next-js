"use client";
import Breadcrumbs from "@/app/components/product/breadcrumbs";
import { fetchProducts } from "@/app/slices/productSlices";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, ArrowLeft, Star, Heart, Info } from "lucide-react";
import { addToCart, addToFavorites } from "@/app/slices/cartSlice";
import { User } from "@supabase/supabase-js";
import { getUserData } from "@/app/auth/getUser";

const Page = () => {
  const [data, setData] = useState<User | null>(null);
  const { favorites } = useSelector((state: any) => state.cart);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserData();
      setData(user);
    };
    fetchUser();
  }, []);

  const dispatch = useDispatch();
  const params = useParams();
  const id = Number(params.id);
  const [imageIndex, setImageIndex] = useState(0);
  const { products, status, error } = useSelector(
    (state: any) => state.products
  );
  const product = products?.find((product: any) => product.id === id);
  const isFavorite = favorites.includes(product?.id);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (index: number) => {
    if (data?.role !== "authenticated") {
      setShowLoginPrompt(true);
      return;
    }
    setRating(index + 1);
  };

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  useEffect(() => {
    if (product?.rating) {
      setRating(product.rating);
    }
  }, [product]);

  if (status === "loading" || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center text-error">
        <p>Error: {error}</p>
      </div>
    );
  }

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  return (
    <div className="container mx-auto px-4 pt-16 lg:pt-20 bg-base-100 pb-16">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs category={product.category} title={product.title} />
        <hr className="my-4 border-base-300" />

        <Link
          href="/Shop"
          className="inline-flex items-center text-primary hover:text-primary-focus transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to shop
        </Link>

        <div className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="flex flex-col items-center p-6 lg:p-8 bg-base-200/30">
            {/* Main Showcase Image */}
            <div className="aspect-square relative rounded-xl overflow-hidden bg-base-100 w-full max-w-[600px] shadow-md">
              <Image
                src={product.image_urls[imageIndex]}
                alt={product.title}
                className="object-contain w-full h-full transform transition-transform duration-300 hover:scale-105"
                width={600}
                height={600}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Thumbnails Section */}
            <div className="flex flex-wrap justify-center gap-3 mt-6 w-full max-w-[600px]">
              {product.image_urls.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setImageIndex(index)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 
                    ${index === imageIndex 
                      ? "ring-2 ring-primary shadow-md scale-105" 
                      : "hover:shadow-md hover:scale-105 opacity-80 hover:opacity-100"}`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} - Image ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="p-6 lg:p-8 space-y-6 flex flex-col">
            <div className="space-y-2">
              <Link
                href={`/Shop?category=${product.category}`}
                className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                {product.category}
              </Link>
              
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-base-content leading-tight">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    className="focus:outline-none"
                    aria-label={`Rate ${index + 1} stars`}
                  >
                    <Star
                      className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
                        index < (hoverRating ?? rating)
                          ? "fill-warning text-warning"
                          : "text-base-content/30"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-base-content/70 ml-1 text-sm">({rating})</span>
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-4">
              <div className="flex items-baseline bg-primary/10 px-4 py-2 rounded-lg">
                <p className="text-xl text-primary">৳</p>
                <p className="text-3xl lg:text-4xl font-bold text-primary ml-1">
                  {discountedPrice.toFixed(2)}
                </p>
              </div>

              {product.discount > 0 && (
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-error flex items-center">
                    <span className="bg-error/10 text-error px-2 py-1 rounded-md">
                      {product.discount}% OFF
                    </span>
                  </p>
                  <p className="text-base-content/50 line-through">
                    ৳{product.price.toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center mt-4">
              {product.availability === "in-stock" ? (
                <div className="flex items-center text-success font-medium">
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  In Stock
                </div>
              ) : (
                <div className="flex items-center text-error font-medium">
                  <div className="w-2 h-2 bg-error rounded-full mr-2"></div>
                  Out of Stock
                </div>
              )}
            </div>

            <div className="divider my-2"></div>

            <p className="text-base-content/80 text-lg leading-relaxed flex-grow">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                className={`btn btn-success btn-lg flex-1 hover:shadow-lg ${
                  product.availability !== "in-stock" ? "btn-disabled" : ""
                }`}
                disabled={product.availability !== "in-stock"}
                onClick={() => dispatch(addToCart(product))}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to cart
              </button>

              <button
                className={`btn btn-lg flex-1 hover:shadow-lg ${
                  data?.role === "authenticated"
                    ? isFavorite
                      ? "btn-error"
                      : "btn-outline btn-primary"
                    : "btn-disabled"
                }`}
                disabled={data?.role !== "authenticated"}
                onClick={() => dispatch(addToFavorites(product))}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-error" : ""}`}
                />
                {isFavorite ? "Remove" : "Favorite"}
              </button>
            </div>
            
            {data?.role !== "authenticated" && (
              <div className="flex items-center p-3 bg-info/10 text-info rounded-lg mt-4">
                <Info className="w-5 h-5 mr-2 flex-shrink-0" />
                <p className="text-sm">Sign in to save items to your favorites list</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="modal-box bg-base-100 p-6 rounded-lg shadow-xl max-w-md">
            <h3 className="font-bold text-lg mb-4">Sign in to rate this product</h3>
            <p className="py-4">Please log in or create an account to rate products and track your preferences.</p>
            <div className="modal-action flex flex-col sm:flex-row gap-3">
              <Link href="/login" className="btn btn-primary flex-1">Sign In</Link>
              <Link href="/register" className="btn btn-outline flex-1">Create Account</Link>
              <button className="btn btn-ghost" onClick={() => setShowLoginPrompt(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;