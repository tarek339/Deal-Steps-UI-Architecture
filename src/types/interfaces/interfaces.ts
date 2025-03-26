export interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  address: {
    city: string;
    street: string;
    houseNumber: string;
    zipCode: string;
  };
}
