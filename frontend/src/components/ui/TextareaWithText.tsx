import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TextareaWithText({
  isRequired,
  variant,
  color,
  label,
  placeholder,
  className,
  value,
  onChange,
}: {
  isRequired: boolean;
  variant: "bordered" | "solid" | "outlined"; // Assuming these are the possible variants
  color: "primary" | "secondary" | "default"; // Assuming these are the possible colors
  label: string;
  placeholder: string;
  className: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="prompt-text">{label}</Label>
      <Textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id="prompt-text"
      />
    </div>
  );
}
