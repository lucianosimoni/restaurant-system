"use client";
import { FormEvent, useState } from "react";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import Error from "next/error";
import { saveProfile } from "@/lib/appLocalStorage";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestAccessLoading, setIsRequestAccessLoading] = useState(false);
  const [error, setError] = useState({ message: "", show: false });

  const router = useRouter();

  const sendForm = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target as any;
    const body = { credential: form[0].value, password: form[1].value } as any;

    try {
      if (body.credential === "" || body.password === "") {
        setIsLoading(false);
        return setError({ message: "Faltando informações.", show: true });
      }

      const response = await fetch("http://localhost:3000/staff/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      const parsedResponse = await response.json();

      if (!response.ok) {
        const newError = new Error(parsedResponse.error.message as any) as any;
        newError.status = response.status;
        setIsLoading(false);
        throw newError;
      }

      const loggedInStaff = parsedResponse.loggedInStaff;

      console.log("parsed res is:");
      console.log(parsedResponse.loggedInStaff);

      saveProfile({
        token: loggedInStaff.token,
        id: loggedInStaff.id,
        credential: loggedInStaff.credential,
        firstName: loggedInStaff.staffInfo.firstName,
        lastName: loggedInStaff.staffInfo.lastName,
        role: loggedInStaff.staffInfo.role,
        sectorLeader: loggedInStaff.sectorLeader,
        sector: loggedInStaff.sector,
      });
      router.replace("/");
      setIsLoading(false);
    } catch (error) {
      // @ts-ignore
      switch (error.status) {
        case 401:
          setIsLoading(false);
          return setError({ message: "Dados inválidos.", show: true });
        default:
          setIsLoading(false);
          return setError({
            message: "Algo aconteceu. Tente novamente.",
            show: true,
          });
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full items-center"
      onSubmit={sendForm}
    >
      <Input
        type="text"
        color="default"
        label="Usuário"
        placeholder="seunome"
        className="md:w-1/2 w-full"
        onChange={() => setError({ message: "", show: false })}
      />
      <Input
        type="password"
        label="Senha"
        placeholder="Sua senha"
        className="md:w-1/2 w-full"
        onChange={() => setError({ message: "", show: false })}
      />

      <Button
        type="submit"
        color="primary"
        size="lg"
        className="md:w-1/2 w-full"
        isLoading={isLoading}
      >
        Entrar
      </Button>

      <Button
        as={Link}
        type="button"
        color="default"
        size="lg"
        className="md:w-1/2 w-full"
        href="/request-access"
        onClick={() => setIsRequestAccessLoading(true)}
        isLoading={isRequestAccessLoading}
      >
        Não tenho uma conta
      </Button>

      {error.show && (
        <Card className="md:w-1/2 w-full bg-danger-50 text-danger">
          <CardBody className="text-center">
            <p>{error.message}</p>
          </CardBody>
        </Card>
      )}
    </form>
  );
}
