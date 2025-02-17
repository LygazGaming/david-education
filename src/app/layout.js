// app/layout.js
"use client";
import "./globals.css";
import NotificationBar from "../components/NotificationBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FreeTrialButton from "../components/FreeTrialButton";
import ContactButtons from "../components/ContactButtons";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Kiểm tra xem đường dẫn có bắt đầu bằng '/admin' không
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <html lang="vi">
      <head>
        <title>David Education</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* Chỉ hiển thị NotificationBar và Header nếu không phải là trang admin */}
        {!isAdminPage && <NotificationBar />}
        {!isAdminPage && <Header />}

        <main className="flex-grow">{children}</main>

        {/* Chỉ hiển thị Footer, FreeTrialButton và ContactButtons nếu không phải là trang admin */}
        {!isAdminPage && <Footer />}
        {!isAdminPage && <FreeTrialButton />}
        {!isAdminPage && <ContactButtons />}
      </body>
    </html>
  );
}
