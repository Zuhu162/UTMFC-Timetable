"use client";
import { useContext, useEffect } from "react";
import Welcome from "@/components/Welcome";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, checkAndRefresh } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("web_fc_utm_my_ttms");
      if (!storedUser) {
        router.push("/login");
      }
    }
  }, [user, router, checkAndRefresh]);

  if (!user || Object.keys(user).length === 0) {
    return null; // or a loading indicator
  }

  return (
    <main className="w-full xl:w-3/4 2xl:w-1/2 flex justify-center items-center min-h-[80vh]">
      <Welcome />
    </main>
  );
}
