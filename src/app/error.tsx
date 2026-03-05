"use client";

export default function AppErrorPage() {
  return (
    <div className="container py-10">
      <h2 className="text-2xl font-semibold">Nepodarilo se nacist nabidku.</h2>
      <p className="mt-3 text-sm text-neutral-600">
        Zkuste to prosim znovu. Pokud problem pretrva, obnovte stranku.
      </p>
    </div>
  );
}
