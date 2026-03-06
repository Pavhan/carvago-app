import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ErrorPage() {
  return (
    <Card className="border-red-200 bg-red-50 text-red-900">
      <CardHeader className="gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-700">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <CardTitle className="text-2xl">
            Nepodarilo se nacist nabidku.
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-red-800">
        Zkuste to prosim znovu. Pokud problem pretrva, obnovte stranku.
      </CardContent>
    </Card>
  );
}
