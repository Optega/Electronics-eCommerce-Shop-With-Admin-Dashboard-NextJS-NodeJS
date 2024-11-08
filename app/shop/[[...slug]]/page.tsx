export const dynamic = "force-dynamic";
export const revalidate = 0;

import {
  Breadcrumb,
  Filters,
  Pagination,
  Products,
  SortBy,
} from "@/components";
import React from "react";

// improve readabillity of category text, for example category text "smart-watches" will be "smart watches"
const improveCategoryText = (text: string): string => {
  if (text.indexOf("-") !== -1) {
    let textArray = text.split("-");

    return textArray.join(" ");
  } else {
    return text;
  }
};

const ShopPage = async (slug: any) => {
  // sending API request for getting min and max prices of products
  const prices = await fetch(
    `http://localhost:3001/api/products/min-max-prices`
  );
  const minMaxPrices = await prices.json();

  const getCategoryTitle = async (name: string) => {
    const category = await fetch(
      `http://localhost:3001/api/categories/name/${name}`
    );
    const categoryData = await category?.json();
    return categoryData ? categoryData.title : null;
  };

  return (
    <div className="text-black bg-white">
      <div className=" max-w-screen-2xl mx-auto px-10 max-sm:px-5">
        <Breadcrumb />
        <div className="grid grid-cols-[200px_1fr] gap-x-10 max-md:grid-cols-1 max-md:gap-y-5">
          <Filters {...minMaxPrices} />
          <div>
            <div className="flex justify-between items-center max-lg:flex-col max-lg:gap-y-5">
              <h2 className="text-2xl font-bold max-sm:text-xl max-[400px]:text-lg uppercase">
                {slug?.params?.slug && slug?.params?.slug[0]?.length > 0
                  ? getCategoryTitle(slug?.params?.slug[0]) ??
                    improveCategoryText(slug?.params?.slug[0])
                  : "Всі товари"}
              </h2>

              <SortBy />
            </div>
            <div className="divider"></div>
            <Products slug={slug} />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
