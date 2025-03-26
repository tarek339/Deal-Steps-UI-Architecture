import { FormProps } from "react-router";

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {children}
    </form>
  );
};

export default Form;
