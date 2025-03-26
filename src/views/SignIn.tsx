import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, Input } from "@/components/ui/shared";
import withAuthRestrictions from "@/hoc/withAuthRestriction";
import useDispatches from "@/hooks/useDispatches";

const SignIn = () => {
  const { dispatchUser } = useDispatches();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      if (!email) {
        setEmailError("Please enter email");
        return;
      }
      if (!emailRegex.test(email)) {
        setEmailError("Invalid type of email");
        return;
      }
      if (!password) {
        setPasswordError("Please enter password");
        return;
      }

      const response = await axios.post("customer/sign_in_customer", {
        email,
        password,
      });

      dispatchUser(response.data.customer);
      localStorage.setItem("token", response.data.token);
      navigate(`/user-profile/${response.data.customer.id}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setPasswordError("Invalid type of email or password");
      }
      if (axios.isAxiosError(error) && error.response) {
        setEmailError("Invalid type of email or password");
      }
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Sign in to your Account</CardTitle>
          <CardDescription>Enter your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            <Input
              type={"text"}
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              error={emailError}
            />
            <Input
              type={"password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              error={passwordError}
            />
            <Button type="submit">Submit</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

const RestrictedSignIn = withAuthRestrictions(SignIn);
export default RestrictedSignIn;
