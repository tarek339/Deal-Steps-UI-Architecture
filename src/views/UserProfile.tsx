import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, Input, Modal } from "@/components/ui/shared";
import { Toaster } from "@/components/ui/toaster";
import withRestrictions from "@/hoc/withRestrictions";
import { useToast } from "@/hooks/use-toast";
import useDispatches from "@/hooks/useDispatches";
import useSelectors from "@/hooks/useSelectors";

const UserProfile = () => {
  const { user } = useSelectors();
  const { id } = useParams();
  const { dispatchUser } = useDispatches();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [cityError, setCityError] = useState("");
  const [houseNumberError, setHouseNumberError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!firstName) {
        setFirstNameError("First name is required");
        return;
      }
      if (!lastName) {
        setLastNameError("Last name is required");
        return;
      }
      if (!city) {
        setCityError("City is required");
        return;
      }
      if (!houseNumber) {
        setHouseNumberError("House number is required");
        return;
      }
      if (!street) {
        setStreetError("Street is required");
        return;
      }
      if (!zipCode) {
        setZipCodeError("Zip code is required");
        return;
      }
      const response = await axios.put(`customer/edit_customer_profile/${id}`, {
        firstName,
        lastName,
        city,
        houseNumber,
        street,
        zipCode,
      });
      dispatchUser(response.data.customer);
      toast({
        variant: "default",
        title: "Profile updated",
        description: "Your profile has been updated",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Something went wrong - ${(error as Error).message}`,
      });
    }
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(`customer/delete_customer/${id}`);
      localStorage.removeItem("token");
      console.log(response);
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Something went wrong - ${(error as Error).message}`,
      });
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <Toaster />
      <Card>
        <CardHeader>
          <CardTitle>
            {user?.firstName
              ? `Hello, ${user?.firstName} ${user?.lastName}`
              : "Hello, User"}
          </CardTitle>
          <CardDescription>
            {!user?.firstName
              ? "Please complete your personal details"
              : "Edit your personal details"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type={"text"}
              placeholder="First Name"
              value={firstName || user?.firstName || ""}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError("");
              }}
              error={firstNameError}
            />
            <Input
              type={"text"}
              placeholder="Last Name"
              value={lastName || user?.lastName || ""}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError("");
              }}
              error={lastNameError}
            />
            <Input
              type={"text"}
              placeholder="City"
              value={city || user?.address.city || ""}
              onChange={(e) => {
                setCity(e.target.value);
                setCityError("");
              }}
              error={cityError}
            />
            <Input
              type={"text"}
              placeholder="House Number"
              value={houseNumber || user?.address.houseNumber || ""}
              onChange={(e) => {
                setHouseNumber(e.target.value);
                setHouseNumberError("");
              }}
              error={houseNumberError}
            />
            <Input
              type={"text"}
              placeholder="Street"
              value={street || user?.address.street || ""}
              onChange={(e) => {
                setStreet(e.target.value);
                setStreetError("");
              }}
              error={streetError}
            />
            <Input
              type={"text"}
              placeholder="Zip Code"
              value={zipCode || user?.address.zipCode || ""}
              onChange={(e) => {
                setZipCode(e.target.value);
                setZipCodeError("");
              }}
              error={zipCodeError}
            />
            <Button type="submit">Submit</Button>
          </Form>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <Button
            variant={"warning"}
            onClick={() => navigate(`/account-security/${id}`)}
          >
            Account security
          </Button>
          <Modal
            tigger={"Delete account"}
            title={"Are your sure you want to delete your account?"}
            description={
              "After deleting your account, you will not be able to recover it."
            }
            footer={
              <Button variant={"destructive"} onClick={onDelete}>
                Delete
              </Button>
            }
          />
        </CardFooter>
      </Card>
    </div>
  );
};

const RestrictedUserProfile = withRestrictions(UserProfile);
export default RestrictedUserProfile;
