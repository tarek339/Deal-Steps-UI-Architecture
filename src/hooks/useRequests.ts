import axios from "axios";

import { useToast } from "./use-toast";
import useDispatches from "./useDispatches";

const useRequests = () => {
  const { dispatchUser } = useDispatches();
  const { toast } = useToast();

  const fetchUser = async () => {
    try {
      const response = await axios.get(`customer/get_customer_profile`);
      dispatchUser(response.data.customer);
    } catch (error) {
      console.log((error as Error).message);
      toast({
        variant: "destructive",
        title: "Error fetching user",
        description: `Something went wrong - ${(error as Error).message}`,
      });
    }
  };

  return {
    fetchUser,
  };
};

export default useRequests;
