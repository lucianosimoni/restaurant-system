"use client";
import RequestAccessForm from "@/components/RequestAccessForm";
import { getProfile } from "@/lib/appLocalStorage";
import { useRouter } from "next/navigation";

export default function RequestAccess() {
  const router = useRouter();
  const profile = getProfile();

  if (profile.loggedIn) {
    return router.replace("/");
  }

  return <RequestAccessForm />;
}
