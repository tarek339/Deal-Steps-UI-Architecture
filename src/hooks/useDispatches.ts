import { useDispatch } from "react-redux";

import { addCart, addUser, removeUser } from "./redux/slices";

import { UserProps } from "@/types/interfaces/interfaces";
import { CartActionProps } from "@/types/interfaces/slices";

const useDispatches = () => {
  const dispatch = useDispatch();

  const dispatchUser = (user: UserProps) => dispatch(addUser({ user }));
  const existUser = () => dispatch(removeUser());
  const dispatchCart = (cart: CartActionProps) =>
    dispatch(addCart({ ...cart }));

  return {
    dispatchUser,
    existUser,
    dispatchCart,
  };
};

export default useDispatches;
