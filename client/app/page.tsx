import { Button, Input } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 min-h-screen items-center justify-center md:p-24 p-12">
      <section className="flex flex-col w-full items-center">
        <h1 className="text-xl">Sabor Gaúcho</h1>
        <p className="text-sm font-extralight">Restaurante & Churrascaria</p>
      </section>

      <section className="flex flex-col gap-4 w-full items-center ">
        <Input
          type="text"
          color="default"
          label="Credential"
          placeholder="user@business"
          className="md:w-1/2 w-full"
        />
        <Input
          type="password"
          label="Password"
          placeholder="Your Password"
          className="md:w-1/2 w-full"
        />
        <Button color="primary" size="lg" className="md:w-1/2 w-full">
          Entrar
        </Button>
      </section>
    </main>
  );
}
