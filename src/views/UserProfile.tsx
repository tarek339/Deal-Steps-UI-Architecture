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
import { Input } from "@/components/ui/input";
import withRestrictions from "@/hoc/withRestrictions";
import useDispatches from "@/hooks/useDispatches";
import useSelectors from "@/hooks/useSelectors";

const UserProfile = () => {
  const { user } = useSelectors();
  const { id } = useParams();
  const { dispatchUser } = useDispatches();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(`customer/edit_customer_profile/${id}`, {
        firstName,
        lastName,
        city,
        houseNumber,
        street,
        zipCode,
      });
      dispatchUser(response.data.customer);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>
            {user?.firstName && `Hello, ${user?.firstName} ${user?.lastName}`}
          </CardTitle>
          <CardDescription>
            {!user?.firstName
              ? "Please complete your personal details"
              : "Edit your personal details"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type={"text"}
              placeholder="First Name"
              value={firstName || user?.firstName || ""}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              type={"text"}
              placeholder="Last Name"
              value={lastName || user?.lastName || ""}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              type={"text"}
              placeholder="City"
              value={city || user?.address.city || ""}
              onChange={(e) => setCity(e.target.value)}
            />
            <Input
              type={"text"}
              placeholder="House Number"
              value={houseNumber || user?.address.houseNumber || ""}
              onChange={(e) => setHouseNumber(e.target.value)}
            />
            <Input
              type={"text"}
              placeholder="Street"
              value={street || user?.address.street || ""}
              onChange={(e) => setStreet(e.target.value)}
            />
            <Input
              type={"text"}
              placeholder="Zip Code"
              value={zipCode || user?.address.zipCode || ""}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            variant={"secondary"}
            onClick={() => navigate(`/account-security/${id}`)}
          >
            Account security
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const RestrictedUserProfile = withRestrictions(UserProfile);
export default RestrictedUserProfile;
