"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in admin layout:", token);
    if (!token && window.location.pathname !== "/admin/login") {
      console.log("No token, redirecting to /admin/login");
      router.push("/admin/login");
    }
  }, [router]);

  return <div>{children}</div>;
}
