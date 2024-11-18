import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface ParamProduct {
  id: number;
}

interface ProductResponse {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
}

export const getProduct = async (param: ParamProduct) => {
  const response = await axios.get(
    `https://dummyjson.com/products/${param.id}`
  );
  return response.data;
};

const useGetProduct = (param: ParamProduct) =>
  useQuery<ProductResponse>({
    queryKey: ["product", param.id],
    queryFn: () => getProduct(param),
  });

export default useGetProduct;
