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

export interface ProductProps {
  id?: string;
  brand: string;
  description: string;
  imageUrl: string;
  price: string;
  shopName?: string;
}

export interface CartProps {
  id: string;
  brand: string;
  description: string;
  price: string | number;
  totalPrice: string | number;
  quantity: string;
}
