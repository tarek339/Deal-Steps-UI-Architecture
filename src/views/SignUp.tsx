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

const SignUp = () => {
  const { dispatchUser } = useDispatches();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmEmailError, setConfirmEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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
      if (!confirmEmail) {
        setConfirmEmailError("Please confirm email");
        return;
      }
      if (email !== confirmEmail) {
        setConfirmEmailError("Emails do not match");
        return;
      }
      if (!password) {
        setPasswordError("Please enter password");
        return;
      }
      if (!confirmPassword) {
        setConfirmPasswordError("Please confirm password");
        return;
      }
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        return;
      }
      const response = await axios.post("customer/register_new_customer", {
        email,
        password,
      });
      dispatchUser(response.data.customer);
      localStorage.setItem("token", response.data.token);
      navigate(`/user-profile/${response.data.customer.id}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setEmailError(error.response.data.message);
      }
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Sign up a new Account</CardTitle>
          <CardDescription>Enter your data </CardDescription>
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
                setConfirmEmailError("");
              }}
              error={emailError || confirmEmailError}
            />
            <Input
              type={"text"}
              placeholder="Confirm Email"
              value={confirmEmail}
              onChange={(e) => {
                setConfirmEmail(e.target.value);
                setConfirmEmailError("");
                setEmailError("");
              }}
              error={confirmEmailError}
            />
            <Input
              type={"password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
                setConfirmPasswordError("");
              }}
              error={passwordError || confirmPasswordError}
            />
            <Input
              type={"password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setconfirmPassword(e.target.value);
                setConfirmPasswordError("");
                setPasswordError("");
              }}
              error={confirmPasswordError}
            />
            <Button type="submit">Submit</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

const RestrictedSignUp = withAuthRestrictions(SignUp);
export default RestrictedSignUp;
