import type { ComponentProps, ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type FormLabelProps = {
  children: ReactNode;
  required?: boolean;
} & Pick<ComponentProps<typeof Label>, 'className' | 'htmlFor'>;

export function FormLabel({
  children,
  className,
  htmlFor,
  required = false,
}: FormLabelProps) {
  return (
    <Label
      className={cn('block text-sm font-bold text-gray-500', className)}
      htmlFor={htmlFor}
    >
      {children}
      {required ? <span className="ml-1 text-red-600">*</span> : null}
    </Label>
  );
}
