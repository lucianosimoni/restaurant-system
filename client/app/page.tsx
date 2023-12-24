"use client";
import { useEffect } from "react";
import AppNavibar from "../components/Navbar";
import { usePathname, useRouter } from "next/navigation";
import { getProfile } from "../lib/appLocalStorage";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const profile = getProfile();

    if (!profile.loggedIn) router.replace("/login");
  }, []);

  return (
    <>
      <AppNavibar />
      <main className="flex flex-col gap-4 min-h-screen items-center justify-center md:p-24 p-12"></main>
    </>
  );
}
