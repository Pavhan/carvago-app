import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type ButtonVariant = React.ComponentProps<typeof Button>["variant"];

type LoadingButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "variant"
> & {
  children: ReactNode;
  loading?: boolean;
  variant?: ButtonVariant | "primary";
};

function resolveButtonVariant(
  variant: LoadingButtonProps["variant"],
): ButtonVariant {
  if (variant === "primary") {
    return "default";
  }

  return variant;
}

export function LoadingButton({
  children,
  loading = false,
  variant,
  disabled,
  ...props
}: LoadingButtonProps) {
  const { pending } = useFormStatus();
  const isSubmitting = pending || loading;
  const resolvedVariant = resolveButtonVariant(variant);

  return (
    <Button
      {...props}
      disabled={disabled || isSubmitting}
      variant={resolvedVariant}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center gap-2">
          {children}
          <Spinner
            className={
              variant === "primary" || resolvedVariant === "default"
                ? "text-white"
                : "text-black dark:text-white"
            }
            width={16}
            height={16}
          />
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
