// *********************
// Role of the component: Filters on shop page
// Name of the component: Filters.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Filters />
// Input parameters: no input parameters
// Output: stock, rating and price filter
// *********************

"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSortStore } from "@/app/_zustand/sortStore";
import { usePaginationStore } from "@/app/_zustand/paginationStore";
import { useFilterStore } from "@/app/_zustand/filterStore";
import { debounce } from "@/utils/actions";

interface InputCategory {
  inStock: { text: string; isChecked: boolean };
  outOfStock: { text: string; isChecked: boolean };
  priceFilter: { text: string; value: number };
  ratingFilter: { text: string; value: number };
}

const Filters = ({ minPrice = 0, maxPrice = 0 }) => {
  const { filters, setFilters } = useFilterStore();
  const { page } = usePaginationStore();
  const { sortBy } = useSortStore();

  const [inputCategory, setInputCategory] = useState<InputCategory>({
    inStock: { text: "instock", isChecked: true },
    outOfStock: { text: "outofstock", isChecked: true },
    priceFilter: { text: "price", value: maxPrice },
    ratingFilter: { text: "rating", value: 0 },
  });

  const debouncedSetFilters: (newFilters: typeof filters) => void = useCallback(
    debounce((newFilters: typeof filters) => {
      setFilters(newFilters);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSetFilters({
      ...filters,
      outOfStock: inputCategory.outOfStock.isChecked,
      inStock: inputCategory.inStock.isChecked,
      rating: inputCategory.ratingFilter.value,
      price: inputCategory.priceFilter.value,
      sort: sortBy,
      page,
    });
  }, [inputCategory, sortBy, page]);

  useEffect(() => {
    setInputCategory({
      ...inputCategory,
      priceFilter: {
        text: "price",
        value: maxPrice,
      },
    });
  }, [minPrice, maxPrice]);

  const handlePriceChange = (value: number) => {
    setInputCategory((prev) => ({
      ...prev,
      priceFilter: {
        text: "price",
        value,
      },
    }));
  };

  const handleRatingChange = (value: number) => {
    setInputCategory((prev) => ({
      ...prev,
      ratingFilter: {
        text: "rating",
        value,
      },
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center h-8 lg:h-12">
        <h2 className="text-2xl font-bold max-sm:text-xl max-[400px]:text-lg uppercase">Фільтри</h2>
      </div>
      <div className="divider"></div>
      <div className="flex flex-col gap-y-1">
        <h3 className="text-xl mb-2">Наявність</h3>
        <div className="form-control">
          <label className="cursor-pointer flex items-center">
            <input
              type="checkbox"
              checked={inputCategory.inStock.isChecked}
              onChange={() =>
                setInputCategory({
                  ...inputCategory,
                  inStock: {
                    text: "instock",
                    isChecked: !inputCategory.inStock.isChecked,
                  },
                })
              }
              className="checkbox"
            />
            <span className="label-text text-lg ml-2 text-black">В наявності</span>
          </label>
        </div>

        <div className="form-control">
          <label className="cursor-pointer flex items-center">
            <input
              type="checkbox"
              checked={inputCategory.outOfStock.isChecked}
              onChange={() =>
                setInputCategory({
                  ...inputCategory,
                  outOfStock: {
                    text: "outofstock",
                    isChecked: !inputCategory.outOfStock.isChecked,
                  },
                })
              }
              className="checkbox"
            />
            <span className="label-text text-lg ml-2 text-black">Закінчились</span>
          </label>
        </div>
      </div>

      <div className="divider"></div>
      <div className="flex flex-col gap-y-1">
        <h3 className="text-xl mb-2">Ціна</h3>
        <div>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={10}
            value={inputCategory.priceFilter.value}
            className="range"
            onChange={(e) => handlePriceChange(Number(e.target.value))}
          />
          <span>{`Макс ціна: ₴${inputCategory.priceFilter.value}`}</span>
        </div>
      </div>

      <div className="divider"></div>

      <div>
        <h3 className="text-xl mb-2">Мін рейтинг:</h3>
        <input
          type="range"
          min={0}
          max="5"
          value={inputCategory.ratingFilter.value}
          onChange={(e) => handleRatingChange(Number(e.target.value))}
          className="range range-info"
          step="1"
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    </div>
  );
};

export default Filters;
