import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
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
}): Promise<FetchProductsResponse> => {
  const limit = 12; // Fixed limit per page
  const url = `https://dummyjson.com/products?limit=${limit}&skip=${pageParam}&select=title,price,description,thumbnail&sortBy=price&order=${order}`;

  const response: AxiosResponse<FetchProductsResponse> = await axios.get(url);

  // Axios automatically handles response.json()
  return response.data;
};
const useProductInfiniteQuery = (order: "asc" | "desc") => {
  return useInfiniteQuery({
    queryKey: ["products", order], // Unique key for the query including order
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, order }),
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length * 10; // Calculate skip
      return lastPage.products.length > 0 ? currentPage : undefined; // Stop if no more products
    },
  });
};

export default useProductInfiniteQuery;
