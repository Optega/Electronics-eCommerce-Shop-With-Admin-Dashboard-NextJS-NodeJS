// *********************
// Role of the component: Buy Now button that adds product to the cart and redirects to the checkout page
// Name of the component: BuyNowSingleProductBtn.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <BuyNowSingleProductBtn product={product} quantityCount={quantityCount} />
// Input parameters: SingleProductBtnProps interface
// Output: Button with buy now functionality
// *********************

"use client";
import { useProductStore } from "@/app/_zustand/store";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const BuyNowSingleProductBtn = ({ product, quantityCount }: SingleProductBtnProps) => {
  const router = useRouter();
  const { addToCart, calculateTotals } = useProductStore();

  const handleAddToCart = () => {
    if (quantityCount < 1) {
      toast.error("Кількість товару повинна бути більше 0");
      return;
    }

    addToCart({
      id: product?.id.toString(),
      title: product?.title,
      price: product?.price,
      image: product?.mainImage,
      amount: quantityCount,
      unit: product?.unit,
    });
    calculateTotals();
    toast.success("Товар додано до кошика");
    router.push("/checkout");
  };
  return (
    <button
      onClick={handleAddToCart}
      className="btn w-[200px] text-lg border border-blue-500 hover:border-blue-500 border-1 font-normal bg-blue-500 text-white hover:bg-white hover:scale-110 hover:text-blue-500 transition-all uppercase ease-in max-[500px]:w-full"
    >
      Купити
    </button>
  );
};

export default BuyNowSingleProductBtn;
