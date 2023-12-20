import { Input } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center p-24">
      <div className="flex flex-col gap-4 w-full items-center ">
        <Input
          type="text"
          color="default"
          label="Credential"
          placeholder="user@business"
          className="w-1/2"
        />
        <Input
          type="password"
          label="Password"
          placeholder="Your Password"
          className="w-1/2"
        />
      </div>
    </main>
  );
}
