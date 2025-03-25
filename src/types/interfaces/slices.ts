import { UserProps } from "./interfaces";

export interface InitialUserState {
  user: UserProps | null;
}

export interface UserActionProps {
  user: UserProps;
}
