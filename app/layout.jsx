import { Geist, Geist_Mono, Cardo } from "next/font/google";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cardo = Cardo({
  variable: "--font-cardo",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Rushil Raj Portfolio",
  description: "Rushil's personal landing page as a student and developer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cardo.variable} antialiased bg-background text-foreground`}
      >
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}

