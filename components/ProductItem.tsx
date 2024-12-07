// *********************
// Role of the component: Product item component
// Name of the component: ProductItem.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <ProductItem product={product} color={color} />
// Input parameters: { product: Product; color: string; }
// Output: Product item component that contains product image, title, link to the single product page, price, button...
// *********************

import Image from "next/image";
import React from "react";
import Link from "next/link";
import ProductItemRating from "./ProductItemRating";

const ProductItem = ({ product, color }: { product: Product; color: string }) => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={"/images/products" + (product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg")}
          width="0"
          height="0"
          sizes="100vw"
          className="w-auto h-[300px]"
          alt={product?.title}
        />
      </Link>
      <Link
        href={`/product/${product.slug}`}
        className={`text-xl font-normal mt-2 uppercase h-14 text-ellipsis line-clamp-2 ${
          color === "black" ? "text-black" : "text-white"
        }`}
      >
        {product.title}
      </Link>
      <p className={color === "black" ? "text-lg text-black font-semibold" : "text-lg text-white font-semibold"}>
        ₴{product.price}
      </p>

      <ProductItemRating productRating={product?.rating} />
      <Link
        href={`/product/${product?.slug}`}
        className="block flex justify-center items-center w-full uppercase bg-white px-0 py-2 text-base border border-black border-gray-300 font-bold text-blue-600 shadow-sm hover:bg-black hover:bg-gray-100 focus:outline-none focus:ring-2"
      >
        <p>Переглянути товар</p>
      </Link>
    </div>
  );
};

export default ProductItem;
