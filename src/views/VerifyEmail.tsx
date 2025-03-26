import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

const VerifyEmail = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.post("customer/verify_email", {
        token: search.get("token"),
      });
      navigate("/");
    } catch (error) {}
  }, [search, navigate]);
  return null;
};

export default VerifyEmail;
