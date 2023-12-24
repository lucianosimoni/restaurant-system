import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col gap-4 min-h-screen items-center justify-center md:p-24 p-12">
      <section className="flex flex-col w-full items-center">
        <Link href={"/"} className="flex flex-col items-center">
          <h1 className="text-xl">Sabor Gaúcho</h1>
          <p className="text-sm font-extralight">Restaurante & Churrascaria</p>
        </Link>
      </section>
      {children}
    </main>
  );
}
