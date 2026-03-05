import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
};

export function FormField({
  label,
  name,
  type = 'text',
  error,
  required = false,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
