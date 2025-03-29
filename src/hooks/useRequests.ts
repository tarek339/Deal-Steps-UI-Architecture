import axios from "axios";
import { useState } from "react";

import useDispatches from "./useDispatches";

import { ProductProps } from "@/types/interfaces/interfaces";

const useRequests = () => {
  const { dispatchUser, dispatchCart } = useDispatches();

  const [products, setProducts] = useState<ProductProps[]>([]);

  // fetch user
  const fetchUser = async () => {
    try {
      const response = await axios.get(`customer/get_customer_profile`);
      dispatchUser(response.data.customer);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  // fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`products/fetch_products`);
      setProducts(response.data);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const fetchCart = async (id: string) => {
    try {
      const response = await axios.get(`products/fetch_cart/${id}`);
      dispatchCart(response.data.cart);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    fetchUser,
    fetchProducts,
    products,
    fetchCart,
  };
};

export default useRequests;
