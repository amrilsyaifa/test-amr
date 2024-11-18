import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ProductCategoryResponse {
  slug: string;
  name: string;
  url: string;
}

export const getProductCategory = async () => {
  const response = await axios.get(`https://dummyjson.com/products/categories`);
  return response.data;
};

const useGetProductCategory = () =>
  useQuery<ProductCategoryResponse[]>({
    queryKey: ["product-category"],
    queryFn: () => getProductCategory(),
  });

export default useGetProductCategory;
