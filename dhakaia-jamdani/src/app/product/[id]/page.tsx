"use client";
import Breadcrumbs from "@/app/components/product/breadcrumbs";
import { fetchProducts } from "@/app/slices/productSlices";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, ArrowLeft, Star, Heart } from "lucide-react";
import { addToCart, addToFavorites } from "@/app/slices/cartSlice";
import { User } from "@supabase/supabase-js";
import { getUserData } from "@/app/auth/getUser";

const Page = () => {
  const [data, setData] = useState<User | null>(null);
  const { favorites } = useSelector((state: any) => state.cart);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserData();

      console.log(user);
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

  const handleRatingChange = (event: any) => {
    setRating(parseInt(event.target.value, 10));
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  // console.log(product);

  return (
    <div className="container mx-auto px-4 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs category={product.category} title={product.title} />
        <hr className="my-6" />

        <Link
          href="/Shop"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 pb-10">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.image_urls[imageIndex]}
                alt={product.title}
                className="object-cover object-center"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="flex gap-3 justify-around">
                {product.image_urls.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setImageIndex(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                      index === imageIndex ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {product.title}
            </h1>

            <Link
              href={product.category}
              className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              {product.category}
            </Link>

            <div className="flex flex-wrap items-end gap-4">
              <div className="flex bg-gray-100 px-4 py-2 rounded-lg">
                <p className="text-xl text-blue-500">৳</p>
                <p className="text-2xl lg:text-3xl font-bold text-blue-600">
                  {discountedPrice.toFixed(2)}
                </p>
              </div>

              {product.discount > 0 && (
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-red-500">
                    Save {product.discount}% Today
                  </p>
                  <p className="text-gray-400 line-through">
                    ৳{product.price.toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-6 h-6 ${
                    index < rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-gray-600 ml-2">({rating})</span>
            </div>

            <div className="flex items-center">
              {product.availability === "in-stock" ? (
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  In Stock
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                  Out of Stock
                </div>
              )}
            </div>

            <div className="flex gap-4 lg:pt-20">
              <button
                className={`w-full sm:w-auto px-8 py-4 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition-colors ${
                  product.availability === "in-stock"
                    ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={product.availability === "in-stock" ? false : true}
                onClick={() => {
                  console.log(product);
                  dispatch(addToCart(product));
                }}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to cart
              </button>

              <button
                className={`w-full sm:w-auto px-8 py-4 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition-colors ${
                  data?.role === "authenticated"
                    ? isFavorite
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400"
                } cursor-${
                  data?.role === "authenticated" ? "pointer" : "not-allowed"
                }`}
                disabled={data?.role !== "authenticated"}
                onClick={() => {
                  dispatch(addToFavorites(product));
                }}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`}
                />
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
