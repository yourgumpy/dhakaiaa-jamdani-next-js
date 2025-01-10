import Image from "next/image";
import Link from "next/link";
import { addToCart, addToFavorites } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductCard = ({ props }: { props: any }) => {
  const dispatch = useDispatch();
  const { product } = props;
  const pPrice = product.price - (product.price * product.discount) / 100;

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(product));
  };
  
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="card card-compact bg-base-100 md:h-[470px] h-[350px] md:max-w-[380px] max-w-[320px] min-w-[280px] min-h-[270px] shadow-xl">
      <figure>
        <Image
          height={300}
          width={400}
          style={{ objectFit: "cover" }}
          src={product.image_urls[1]}
          alt={product.title}
          className="max-h-96"
        />
      </figure>

      { product.discount == 0 || null ?
        "" :
        <div className="absolute top-5 left-5 bg-cyan-600 p-2 pl-3 pr-3 rounded-full text-white">
          -{product.discount}%
        </div>
      }
      <button onClick={handleAddToFavorites} className="bg-white absolute top-5 p-2 rounded-full md:left-80 left-[260px]">
        <Image
          src="/images/heart-no-fill.png"
          alt="Add to wishlist"
          height={30}
          width={30}
          style={{ cursor: "pointer" }}
        />
      </button>

      <div className="card-body bg-cyan-800 rounded-2xl absolute md:top-[370px] top-[270px] w-full h-[100px]">
        <div className="text-white flex justify-between items-center">
          <div>
            <Link href={`product/${encodeURIComponent(product.id)}`}><h2 className="card-title">{product.title}</h2></Link>
            <p className="text-white">${pPrice}</p>
          </div>
          <Image
            src="/images/add-cart.png"
            alt="Add to cart"
            height={50}
            width={50}
            style={{ cursor: "pointer" }}
            className="bg-white p-2 rounded-full"
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
