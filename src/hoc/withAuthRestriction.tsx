import { ComponentType, JSX, useEffect } from "react";
import { useNavigate } from "react-router";

import useSelectors from "@/hooks/useSelectors";

const withAuthRestrictions = (Component: ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => {
    const { userLoading } = useSelectors();

    const navigate = useNavigate();

    useEffect(() => {
      if (!userLoading && localStorage.getItem("token")) {
        navigate("/"); // Redirect to the main page if the user is not logged in
      }
    }, [navigate, userLoading]);

    return <Component {...props} />;
  };
};

export default withAuthRestrictions;
