"use client";

import ProductCard from "@components/components/product";
import ProductCategory from "@components/components/productCategory";
import useProductInfiniteQuery from "@components/services/query/useProducts";
import { useState } from "react";

export default function Home() {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [category, setCategory] = useState<string>("");
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProductInfiniteQuery({ order, category: category });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col w-full min-h-[100vh] bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Product List
            </h2>
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-row gap-4">
                <select
                  id="sort"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[200px]"
                  onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
                >
                  <option selected>Choose a Sorting</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              <ProductCategory onChange={(e) => setCategory(e.target.value)} />
            </div>
          </div>

          {data?.pages.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
            >
              {page.products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  imageUrl={product.thumbnail}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "No More Products"}
      </button>
    </div>
  );
}
