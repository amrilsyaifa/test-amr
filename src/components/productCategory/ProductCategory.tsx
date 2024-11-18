import useGetProductCategory from "@components/services/query/useProductCategory";
import React, { FC } from "react";

interface ProductCategoryProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ProductCategory: FC<ProductCategoryProps> = ({ onChange }) => {
  const { data, isLoading, error } = useGetProductCategory();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <select
      id="product-category"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[200px]"
      onChange={onChange}
    >
      <option selected>Choose a category</option>
      {data?.map((val) => {
        return (
          <option key={val.slug} value={val.slug}>
            {val.name}
          </option>
        );
      })}
    </select>
  );
};

export default ProductCategory;
