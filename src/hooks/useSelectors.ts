import { useSelector } from "react-redux";

import { RootState } from "./redux/store";

const useSelectors = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const userLoading = useSelector((state: RootState) => state.user.loading);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const total = useSelector((state: RootState) => state.cart.total);

  return {
    user,
    userLoading,
    cart,
    total,
  };
};

export default useSelectors;
