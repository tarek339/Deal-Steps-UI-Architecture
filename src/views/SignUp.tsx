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
import { Input } from "@/components/ui/shared";
import withAuthRestrictions from "@/hoc/withAuthRestriction";
import useDispatches from "@/hooks/useDispatches";

const SignUp = () => {
  const { dispatchUser } = useDispatches();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("customer/register_new_customer", {
        email,
        password,
      });
      dispatchUser(response.data.customer);
      localStorage.setItem("token", response.data.token);
      navigate(`/user-profile/${response.data.customer.id}`);
    } catch (error) {
      console.log(error);
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type={"text"}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type={"text"}
              placeholder="Confirm Email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
            <Input
              type={"password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type={"password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const RestrictedSignUp = withAuthRestrictions(SignUp);
export default RestrictedSignUp;
