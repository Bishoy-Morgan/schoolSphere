import type { Metadata } from "next";
import { Poppins, Moon_Dance } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
});

const moonDance = Moon_Dance({
  variable: "--font-moon-dance",
  weight: ["400"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Schoolsphere – Discover & Connect with Schools",
  description: "A platform for school management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${moonDance.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
