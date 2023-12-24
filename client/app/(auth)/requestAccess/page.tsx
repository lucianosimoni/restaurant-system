"use client";
import { Button, Input } from "@nextui-org/react";

export default function RequestAccess() {
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

      <Button
        type="submit"
        color="primary"
        size="lg"
        className="md:w-1/2 w-full"
      >
        Entrar
      </Button>
    </form>
  );
}
