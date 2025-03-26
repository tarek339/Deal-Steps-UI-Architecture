import { JSX } from "react";

export interface InputFieldProps {
  type: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
}

export interface ModalProps {
  tigger: string;
  title: string;
  description: string;
  footer: string | JSX.Element;
}
