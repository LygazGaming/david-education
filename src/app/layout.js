// app/layout.js
"use client";
import './globals.css';
import NotificationBar from '../components/NotificationBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FreeTrialButton from '../components/FreeTrialButton';


export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <title>David Education</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="flex flex-col min-h-screen">
        <NotificationBar />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FreeTrialButton />
      </body>
    </html>
  );
}