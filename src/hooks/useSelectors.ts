import { useSelector } from "react-redux";

import { RootState } from "./redux/store";

const useSelectors = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const userLoading = useSelector((state: RootState) => state.user.loading);

  return {
    user,
    userLoading,
  };
};

export default useSelectors;
