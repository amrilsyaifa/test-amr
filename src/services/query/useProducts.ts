import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

interface ProductParams {
  order: "asc" | "desc";
  category: string;
}
interface FetchProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const fetchProducts = async ({
  pageParam = 0,
  order = "asc",
  category = "",
}): Promise<FetchProductsResponse> => {
  const limit = 12; // Fixed limit per page
  const baseUrl = category
    ? `https://dummyjson.com/products/category/${category}`
    : "https://dummyjson.com/products";
  const url = `${baseUrl}?limit=${limit}&skip=${pageParam}&select=title,price,description,thumbnail&sortBy=price&order=${order}`;

  const response: AxiosResponse<FetchProductsResponse> = await axios.get(url);

  // Axios automatically handles response.json()
  return response.data;
};

const useProductInfiniteQuery = (params: ProductParams) => {
  return useInfiniteQuery({
    queryKey: ["products", params], // Unique key for the query including order
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetchProducts({
        pageParam,
        order: params.order,
        category: params.category,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length * 10; // Calculate skip
      return lastPage.products.length > 0 ? currentPage : undefined; // Stop if no more products
    },
  });
};

export default useProductInfiniteQuery;
