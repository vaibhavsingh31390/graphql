"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClearRedirect() {
  const router = useRouter();

  useEffect(() => {
    async function clearCache() {
      try {
        await fetch("/api/clear-redirect", {
          cache: "no-store",
          next: { revalidate: 0 },
        });
      } finally {
        router.replace("/?" + Date.now());
      }
    }

    clearCache();
  }, [router]);

  return <div>Clearing redirect cache...</div>;
}
