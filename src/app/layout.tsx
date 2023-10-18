import "./globals.css";
import type { Metadata } from "next";
import { Abel } from "next/font/google";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const abel = Abel({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Useless Idea - Eve Online Polish Corporation",
  description: "Useless Idea - Eve online corporation",
  keywords: "Useless Idea, Eve Online, Polska, Korporacja, Polish, Corporation, Pochven, Poradnik, youtube, ISK, zarobić, isk, iski, ISKI, początkujacy"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={abel.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
