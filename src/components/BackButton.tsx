import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type BackButtonProps = {
  href: string;
  label?: string;
  className?: string;
};

export function BackButton({
  href,
  label = 'Zpět',
  className,
}: BackButtonProps) {
  return (
    <Button asChild variant="ghost" size="sm" className={cn(className)}>
      <Link href={href} data-testid="back-link">
        <ArrowLeft className="h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}
