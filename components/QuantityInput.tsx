// *********************
// Role of the component: Quantity input for incrementing and decrementing product quantity on the single product page
// Name of the component: QuantityInput.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <QuantityInput quantityCount={quantityCount} setQuantityCount={setQuantityCount} />
// Input parameters: QuantityInputProps interface
// Output: one number input and two buttons
// *********************

"use client";

import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

interface QuantityInputProps {
  unit?: string;
  price: number;
  quantityCount: number;
  setQuantityCount: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityInput = ({ unit = "Кількість", price, quantityCount, setQuantityCount }: QuantityInputProps) => {
  const handleQuantityChange = (actionName: string): void => {
    if (actionName === "plus") {
      setQuantityCount(Number(quantityCount) + 1);
    } else if (actionName === "minus" && quantityCount > 1) {
      setQuantityCount(quantityCount - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;

    if (value === "0" || Number(value) < 0) {
      setQuantityCount(0);
      return;
    }

    value = value.replace(/^0+/, "");

    e.target.value = value;

    setQuantityCount(Number(value));
  };

  return (
    <div className="flex flex-col items-start gap-1 justify-center">
      <div className="flex items-center gap-x-4 max-[500px]:justify-center">
        <p className="text-xl">{unit}: </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={quantityCount < 1}
            className="size-10 leading-10 text-gray-600 transition hover:opacity-75 flex justify-center items-center border"
            onClick={() => handleQuantityChange("minus")}
          >
            <FaMinus />
          </button>

          <input
            type="number"
            id="Quantity"
            value={quantityCount}
            onChange={handleInputChange}
            className="h-10 w-20 rounded border-gray-200 sm:text-sm input-no-arrows"
          />

          <button
            type="button"
            className="size-10 leading-10 text-gray-600 transition hover:opacity-75 flex justify-center items-center border"
            onClick={() => handleQuantityChange("plus")}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <p className="text-lg">Сума: ₴{quantityCount * price}</p>
    </div>
  );
};

export default QuantityInput;
