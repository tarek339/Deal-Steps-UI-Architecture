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
import { Form, Input } from "@/components/ui/shared";
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

  const [emailError, setEmailError] = useState("");
  const [confirmEmailError, setConfirmEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email) {
        setEmailError("Email is required");
        return;
      }
      if (!confirmEmail) {
        setConfirmEmailError("Confirm email is required");
        return;
      }
      if (email !== confirmEmail) {
        setEmailError("Emails do not match");
        setConfirmEmailError("Emails do not match");
        return;
      }
      const response = await axios.put(
        `customer/change_costumers_email/${id}`,
        {
          email,
          confirmEmail,
        },
      );
      console.log(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setEmailError(error.response.data.message);
      }
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!password) {
        setPasswordError("Password is required");
        return;
      }
      if (!newPassword) {
        setNewPasswordError("New password is required");
        return;
      }
      if (!confirmPassword) {
        setConfirmPasswordError("Confirm password is required");
        return;
      }
      if (newPassword !== confirmPassword) {
        setNewPasswordError("Passwords do not match");
        setConfirmPasswordError("Passwords do not match");
        return;
      }
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
      if (axios.isAxiosError(error) && error.response) {
        setPasswordError(error.response.data.message);
      }
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
              error={emailError}
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
            <Button type="submit">Submit</Button>
          </Form>
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
          <Form onSubmit={handleSubmitPassword} className="flex flex-col gap-4">
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
            <Input
              type={"password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setNewPasswordError("");
                setConfirmPasswordError("");
              }}
              error={newPasswordError || confirmPasswordError}
            />
            <Input
              type={"password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError("");
                setNewPasswordError("");
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

const RestrictedAccountSecurity = withRestrictions(AccountSecurity);
export default RestrictedAccountSecurity;
