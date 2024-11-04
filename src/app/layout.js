// app/layout.js
import './globals.css';
import NotificationBar from '../components/NotificationBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FreeTrialButton from '../components/FreeTrialButton';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>David Education</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* Notification Bar */}
        <NotificationBar />
        {/* Header */}
        <Header />
        {/* Main Content */}
        <main className="flex-grow px-4 md:px-8">
          {children}
          </main>
        {/* Footer */}
        <Footer />
        {/* FreeTrialButton */}
        <FreeTrialButton />
      </body>
    </html>
  );
}
