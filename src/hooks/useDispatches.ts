import { useDispatch } from "react-redux";

import { addUser } from "./redux/slices";

import { UserProps } from "@/types/interfaces/interfaces";

const useDispatches = () => {
  const dispatch = useDispatch();

  const dispatchUser = (user: UserProps) => dispatch(addUser({ ...user }));

  return {
    dispatchUser,
  };
};

export default useDispatches;
