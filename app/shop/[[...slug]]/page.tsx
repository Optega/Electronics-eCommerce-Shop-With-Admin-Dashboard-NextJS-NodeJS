"use client";
import { Breadcrumb, Filters, Pagination, Products, SortBy } from "@/components";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// improve readability of category text, for example category text "smart-watches" will be "smart watches"
const improveCategoryText = (text: string): string => {
  return text.replace(/-/g, " ");
};

const ShopPage = () => {
  const params = useParams();
  const category = params?.slug ? params.slug[0] : null;

  const [categoryTitle, setCategoryTitle] = useState<string | null>(null);
  const [minMaxPrices, setMinMaxPrices] = useState<any>(null);

  // Fetch min-max prices for filters
  useEffect(() => {
    const fetchMinMaxPrices = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/products/min-max-prices`);
        const data = await response.json();
        setMinMaxPrices(data);
      } catch (error) {
        console.error("Error fetching min-max prices:", error);
      }
    };
    fetchMinMaxPrices();
  }, []);

  // Fetch category title based on slug
  useEffect(() => {
    const fetchCategoryTitle = async () => {
      if (category) {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/categories/slug/${category}`);
          const categoryData = await response.json();
          setCategoryTitle(categoryData?.title || null);
        } catch (error) {
          console.error("Error fetching category title:", error);
        }
      }
    };
    fetchCategoryTitle();
  }, [category]);

  return (
    <div className="text-black bg-white">
      <div className="max-w-screen-2xl mx-auto px-10 max-sm:px-5">
        <Breadcrumb title={categoryTitle} />
        <div className="grid grid-cols-[200px_1fr] gap-x-10 max-md:grid-cols-1 max-md:gap-y-5">
          <Filters {...minMaxPrices} />
          <div>
            <div className="flex justify-between items-center max-lg:flex-col max-lg:gap-y-5">
              <h2 className="text-2xl font-bold max-sm:text-xl max-[400px]:text-lg uppercase">
                {categoryTitle ? categoryTitle : category ? improveCategoryText(category) : "Всі товари"}
              </h2>
              <SortBy />
            </div>
            <div className="divider"></div>
            <Products category={category} maxPrice={minMaxPrices?.maxPrice} />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
