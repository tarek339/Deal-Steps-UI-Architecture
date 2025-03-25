import { Input } from "@/components/ui/input";
import { InputFieldProps } from "@/types/interfaces/components";

const InputField = ({
  type,
  value,
  placeholder,
  onChange,
}: InputFieldProps) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;
