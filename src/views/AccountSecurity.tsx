import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import withRestrictions from "@/hoc/withRestrictions";
import useSelectors from "@/hooks/useSelectors";

const AccountSecurity = () => {
  const { user } = useSelectors();
  const { id } = useParams();

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `customer/change_costumers_email/${id}`,
        {
          email,
          confirmEmail,
        },
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `customer/change_costumers_password/${id}`,
        {
          password,
          newPassword,
          confirmPassword,
        },
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Email settings</CardTitle>
          <CardDescription>
            Manage your email settings and preferences. Your current email is:{" "}
            <span className="font-bold">{user?.email}</span>
          </CardDescription>
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
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password settings</CardTitle>
          <CardDescription>
            Manage your password settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitPassword} className="flex flex-col gap-4">
            <Input
              type={"password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type={"password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type={"password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const RestrictedAccountSecurity = withRestrictions(AccountSecurity);
export default RestrictedAccountSecurity;
