"use client";
import Breadcrumbs from "@/app/components/product/breadcrumbs";
import { fetchProducts } from "@/app/slices/productSlices";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const [imageIndex, setImageIndex] = useState(0);
  const { products, status, error } = useSelector(
    (state: any) => state.products
  );
  const product = products.find((product: any) => product._id === id);
  // console.log(product);

  const [rating, setRating] = useState(0);

  const handleRatingChange = (event: any) => {
    setRating(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  useEffect(() => {
    if(product && product.rating) {
      setRating(product.rating);
      console.log(product.rating);
    }
  },[product]);

  if (status === "loading" || !product) {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container p-5 pt-24 md:pl-16">
      <Breadcrumbs category={product.category} title={product.title} />
      <hr />
      <div className="md:flex md:justify-between md:pl-20 gap-10 pt-4">
        {/* left part */}
        <div>
          <div>
            <Link href="/Shop">
              <p className="text-red-500 flex gap-2 cursor-pointer pb-2">
                <span className="material-icons">west</span>
                Back to shop
              </p>
            </Link>
          </div>
          <div className="flex gap-2">
            <div className="w-[100px] max-h-[500px] overflow-x-auto scroll-auto">
              <div className="grid justify-center gap-3">
                {product.imageUrl.map((image: any, index: any) => (
                  <Image
                    onClick={() => setImageIndex(index)}
                    key={index}
                    src={image.downloadURL}
                    alt={product.title}
                    className="w-22 h-22 min-w-22 rounded-md"
                    width={1080}
                    height={720}
                  />
                ))}
              </div>
            </div>
            <div className="flex">
              <Image
                src={product.imageUrl[imageIndex].downloadURL}
                alt={product.title}
                className="w-fit max-h-[500px] rounded-md"
                width={1080}
                height={720}
              />
            </div>
          </div>
        </div>
        {/* right part */}
        <div className="pt-6 lg:w-[800px] md:w-[200px]">
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="pt-4 text-slate-500">{product.description}</p>
          <div className="flex gap-3">
            <p className="text-xl pt-5 font-bold">
              ৳{product.price - (product.price * product.discount) / 100}
            </p>
            {product.discount > 0 && (
              <p className="text-gray-500 text-xl pt-5 font-bold text-opacity-60 line-through">
                ৳{product.price}
              </p>
            )}
          </div>
          <p className="pt-2"><span className="text-gray-600">Category:</span> {product.category}</p>

          <div className="rating pt-4">
            {[...Array(5)].map((_, index) => (
              <input
                key={index}
                type="radio"
                name="rating-2"
                value={index + 1}
                className="mask mask-star-2 bg-orange-400"
                checked={rating === index + 1}
                onChange={handleRatingChange}
              />
            ))}
            <p className="pl-2">{product.rating}</p>
            <p className="pl-2">| Reviews:</p>
            <p className="pl-2">{(product.reviews.length > 0) || 0}</p>
          </div>
          <div className="pt-3 text-l">
            {product.inStock === true ?
              (<p className="flex align-middle text-green-700">
                <span className="material-icons pr-2">check_box</span>
                In Stock
              </p>) :
              (<p className="flex align-middle text-red-700">
                <span className="material-icons pr-2">cancel</span>
                Out of Stock
              </p>)
            }
          </div>
          <div className="flex justify-">
            <button className="bg-blue-500 text-white p-2 rounded-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
