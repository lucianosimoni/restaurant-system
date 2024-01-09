"use client";
import { getProfile } from "@/lib/appLocalStorage";
import LoginForm from "../../../components/LoginForm";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const profile = getProfile();

  if (profile.loggedIn) {
    return router.replace("/");
  }

  return <LoginForm />;
}
