import { UserProps } from "./interfaces";

export interface InitialUserState {
  user: UserProps | null;
  loading: boolean;
}

export interface UserActionProps {
  user: UserProps;
}
