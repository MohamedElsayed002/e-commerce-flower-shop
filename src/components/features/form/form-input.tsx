import { Input } from "@/components/ui/input";

type FormInput = {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
};

export default function FormInput({ name, type, placeholder }: FormInput) {
  return (
    <div className="mb-2">
      <Input  id={name} name={name} type={type} placeholder={placeholder} className="w-full shadow-md" />
    </div>
  );
}
