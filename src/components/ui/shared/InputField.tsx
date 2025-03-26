import { Input } from "@/components/ui/input";
import { InputFieldProps } from "@/types/interfaces/components";

const InputField = ({
  type,
  value,
  placeholder,
  onChange,
  error,
}: InputFieldProps) => {
  return (
    <div>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span className="pl-1 text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default InputField;
