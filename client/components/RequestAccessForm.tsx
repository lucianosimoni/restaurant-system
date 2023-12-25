"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

export default function RequestAccessForm() {
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  return (
    <form className="flex flex-col gap-4 w-full items-center">
      <Input
        type="text"
        color="default"
        label="Credenciais"
        placeholder="nome@saborgaucho"
        className="md:w-1/2 w-full"
      />
      <Input
        type="password"
        label="Senha"
        placeholder="Sua senha"
        className="md:w-1/2 w-full"
      />
      <Input
        type="text"
        label="Primeiro nome"
        placeholder="Digite seu primeiro nome"
        className="md:w-1/2 w-full"
      />
      <Input
        type="text"
        label="Ultimo nome"
        placeholder="Digite seu ultimo nome"
        className="md:w-1/2 w-full"
      />

      <Button
        type="submit"
        color="primary"
        size="lg"
        className="md:w-1/2 w-full"
      >
        Enviar detalhes
      </Button>
      <Button
        as={Link}
        type="button"
        color="default"
        size="lg"
        className="md:w-1/2 w-full"
        href="/login"
        onClick={() => setIsLoginLoading(true)}
        isLoading={isLoginLoading}
      >
        Já tenho uma conta
      </Button>
    </form>
  );
}
