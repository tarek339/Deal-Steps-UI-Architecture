import { CartProps, UserProps } from "./interfaces";

export interface InitialUserState {
  user: UserProps | null;
  loading: boolean;
}

export interface UserActionProps {
  user: UserProps;
}

export interface initalCartState {
  cart: CartProps[];
  total: number;
}

export interface CartActionProps {
  cart: CartProps[];
  total: number;
}
