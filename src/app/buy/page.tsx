import Link from "next/link";

export default function BuyPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-semibold">Koupit</h1>
      <p>
        Všechna dostupná auta najdeš na stránce{" "}
        <Link className="underline" href="/cars">
          /cars
        </Link>
        .
      </p>
    </div>
  );
}
