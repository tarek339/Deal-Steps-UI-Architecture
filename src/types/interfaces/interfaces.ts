export interface UserProps {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: {
    city: string;
    street: string;
    houseNumber: string;
    zipCode: string;
  };
}
