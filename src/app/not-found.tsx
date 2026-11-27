import Link from "next/link";
import { Monogram } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <main className="bg-navy-grain flex min-h-screen flex-col items-center justify-center px-4 text-center text-white">
      <Monogram className="size-16" />
      <h1 className="mt-8 text-4xl font-extrabold">Page introuvable</h1>
      <p className="mt-3 max-w-md text-white/70">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
      <Link href="/" className="mt-8 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-gold-light">
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
