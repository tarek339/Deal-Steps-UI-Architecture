import { useDispatch } from "react-redux";

import { addUser, removeUser } from "./redux/slices";

import { UserProps } from "@/types/interfaces/interfaces";

const useDispatches = () => {
  const dispatch = useDispatch();

  const dispatchUser = (user: UserProps) => dispatch(addUser({ ...user }));
  const existUser = () => dispatch(removeUser());

  return {
    dispatchUser,
    existUser,
  };
};

export default useDispatches;
