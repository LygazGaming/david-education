"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Sử dụng window.location.pathname thay vì router.pathname
    if (
      typeof window !== "undefined" &&
      !token &&
      window.location.pathname.startsWith("/admin") &&
      window.location.pathname !== "/admin/login"
    ) {
      router.push("/admin/login");
    }
  }, [router]);

  return <div>{children}</div>;
}
