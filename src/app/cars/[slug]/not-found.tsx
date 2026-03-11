import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CarNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-4">
      <Card className="w-full">
        <CardHeader className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            404
          </p>
          <CardTitle className="text-2xl sm:text-3xl">
            Auto se nenašlo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm sm:text-base">
          <p className="text-muted-foreground">
            Omlouváme se, ale detail tohoto auta už není dostupný nebo odkaz
            není správný.
          </p>

          <Button asChild variant="outline">
            <Link href="/">Domů</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
