"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && window.location.pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [router]);

  return <div>{children}</div>;
}
