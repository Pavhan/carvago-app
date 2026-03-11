import type { ComponentProps, ReactNode } from "react";
import { FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

type FormLabelProps = {
  children: ReactNode;
  required?: boolean;
} & Pick<ComponentProps<typeof FieldLabel>, "className" | "htmlFor">;

export function FormLabel({
  children,
  className,
  htmlFor,
  required = false,
}: FormLabelProps) {
  return (
    <FieldLabel className={cn("block", className)} htmlFor={htmlFor}>
      {children}
      {required ? <span className="ml-1 text-red-600">*</span> : null}
    </FieldLabel>
  );
}
