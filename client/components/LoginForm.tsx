"use client";
import { FormEvent, useState } from "react";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import Error from "next/error";
import { saveProfile } from "@/lib/appLocalStorage";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
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
      console.log(response);
      console.log(parsedResponse);

      if (!response.ok) {
        const newError = new Error(parsedResponse.error.message as any) as any;
        newError.status = response.status;
        setIsLoading(false);
        throw newError;
      }

      const loggedInStaff = parsedResponse.loggedInStaff;

      saveProfile({
        credential: loggedInStaff.credential,
        firstName: loggedInStaff.staffInfo.firstName,
        lastName: loggedInStaff.staffInfo.lastName,
        token: loggedInStaff.token,
      });
      router.replace("/");
      setIsLoading(false);
    } catch (error) {
      // @ts-ignore
      switch (error.status) {
        case 401:
          return setError({ message: "Dados inválidos.", show: true });
        default:
          return setError({
            message: "Algo acontece. Tente novamente.",
            show: true,
          });
          break;
      }
      setIsLoading(false);
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
        label="Credenciais"
        placeholder="nome@saborgaucho"
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

      {error.show && (
        <Card className="w-full bg-danger-50 text-danger">
          <CardBody className="text-center">
            <p>{error.message}</p>
          </CardBody>
        </Card>
      )}
    </form>
  );
}

async function sendForm(event: FormEvent) {
  event.preventDefault();
  const form = event.target as any;
  const body = {
    credential: form[0].value,
    password: form[1].value,
  } as any;
  const jsonBody = JSON.stringify(body);

  try {
    console.log(body);
    const response = await fetch("http://localhost:3000/staff/login", {
      method: "POST",
      body: body,
    });
    console.log(response);
  } catch (error) {
    console.error("Error while sending Login Form");
    console.log(error);
  }
}
