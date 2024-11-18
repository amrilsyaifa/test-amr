"use client";

import ProductCard from "@components/components/product";
import useProductInfiniteQuery from "@components/services/query/useProducts";
import { useState } from "react";

export default function Home() {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProductInfiniteQuery(order);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col w-full min-h-[100vh] bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>
          <div className="flex flex-row gap-4">
            <p className="text-black" onClick={() => setOrder("asc")}>
              ASC
            </p>
            <p className="text-black" onClick={() => setOrder("desc")}>
              Desc
            </p>
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
