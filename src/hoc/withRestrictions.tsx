import { ComponentType, JSX, useEffect } from "react";
import { useNavigate } from "react-router";

import useSelectors from "@/hooks/useSelectors";

const withRestrictions = (Component: ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => {
    const { user, userLoading } = useSelectors();

    const navigate = useNavigate();

    useEffect(() => {
      if (!user && userLoading && !localStorage.getItem("token")) {
        navigate("/"); // Redirect to the main page if the user is not logged in
      }
    }, [user, navigate, userLoading]);

    // Render the component only if the user is logged in
    if (userLoading) {
      return null; // Optionally, you can return a loading spinner or placeholder
    }

    return <Component {...props} />;
  };
};

export default withRestrictions;
