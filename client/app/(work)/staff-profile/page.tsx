"use client";
import { getProfile } from "@/lib/appLocalStorage";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StaffProfile() {
  const profile = getProfile();
  const router = useRouter();

  if (!profile.loggedIn) {
    return router.back();
  }

  return (
    <main>
      <h1>Perfil Staff</h1>

      <div className="flex flex-row gap-8">
        <div className="flex flex-col">
          <p>Primeiro nome:</p>
          <p>
            <b>{profile.profile?.firstName} </b>
          </p>
        </div>
        <div className="flex flex-col">
          <p>Ultimo nome:</p>
          <p>
            <b>{profile.profile?.lastName}</b>
          </p>
        </div>
      </div>

      <div className="flex flex-row">
        <p>Cargo:</p>
        <p>
          <b>{profile.profile?.role}</b>
        </p>
      </div>

      <div className="flex flex-row">
        <p>Lider do Setor:</p>
        <p>
          <b>{profile.profile?.sectorLeader}</b>
        </p>
      </div>

      <Button as={Link} color="primary" href={"/"}>
        Voltar
      </Button>
    </main>
  );
}
