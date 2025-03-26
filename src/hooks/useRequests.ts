import axios from "axios";

import useDispatches from "./useDispatches";

const useRequests = () => {
  const { dispatchUser } = useDispatches();

  const fetchUser = async () => {
    try {
      const response = await axios.get(`customer/get_customer_profile`);
      dispatchUser(response.data.customer);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    fetchUser,
  };
};

export default useRequests;
