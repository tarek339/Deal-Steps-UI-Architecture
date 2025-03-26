import { JSX } from "react";

export interface FormProps {
  children: JSX.Element[] | JSX.Element;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface InputFieldProps {
  type: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined;
  error?: string;
}

export interface ModalProps {
  tigger: string;
  title: string;
  description: string;
  footer: string | JSX.Element;
}

export interface ProductProps {
  title: string;
  image?: string;
  description: string;
  price: number;
}
