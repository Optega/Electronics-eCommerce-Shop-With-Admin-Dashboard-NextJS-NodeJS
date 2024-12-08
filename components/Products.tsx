"use client";
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { useFilterStore } from "@/app/_zustand/filterStore";
import { usePaginationStore } from "@/app/_zustand/paginationStore";

const Products = ({ category, maxPrice }: { category: string | null; maxPrice?: number }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { filters } = useFilterStore();
  const { setOrdersCount } = usePaginationStore();

  useEffect(() => {
    // getting all data from URL slug and preparing everything for sending GET request
    const price = filters?.price || maxPrice || 0;
    const rating = filters?.rating || 0;
    const inStockNum = filters?.inStock ? true : false;
    const outOfStockNum = filters?.outOfStock ? 1 : 0;
    const sort = filters?.sort || "defaultSort";
    const page = filters?.page ? Number(filters?.page) : 1;

    let stockMode = "not";

    // preparing inStock and out of stock filter for GET request
    if (inStockNum) {
      stockMode = "not";
    }
    if (outOfStockNum) {
      stockMode = "equals";
    }
    if (inStockNum && outOfStockNum) {
      stockMode = "gte";
    }
    if (!inStockNum && !outOfStockNum) {
      stockMode = "lt";
    }

    // Sending API request with filtering, sorting and pagination for getting all products
    const fetchProducts = async () => {
      try {
        const url = new URL(`${process.env.BACKEND_URL}/api/products`);

        const searchParams = new URLSearchParams();
        searchParams.set("price", price.toString());
        searchParams.set("rating", rating.toString());
        searchParams.set("inStock", stockMode);
        searchParams.set("category", category || "");
        searchParams.set("sort", sort);
        searchParams.set("page", page.toString());

        url.search = searchParams.toString();

        const response = await fetch(url.toString());

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setOrdersCount(data.length);
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "An error occurred while fetching products");
        } else {
          setError("An error occurred while fetching products");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, category]);

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
      {products.length > 0 ? (
        products.map((product: Product) => <ProductItem key={product.id} product={product} color="black" />)
      ) : (
        <h3 className="text-3xl mt-5 text-center w-full col-span-full max-[1000px]:text-2xl max-[500px]:text-lg">
          Немає товарів за вибраними фільтрами
        </h3>
      )}
    </div>
  );
};

export default Products;
