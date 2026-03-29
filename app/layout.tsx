import type { Metadata } from "next";
import { Lora, IBM_Plex_Mono, Work_Sans } from "next/font/google";
import "./globals.css";
import { PremiumProvider } from "./contexts/PremiumContext";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkillEx — Student Skill Exchange",
  description: "A digital hub for students to connect, learn, and grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${plexMono.variable} ${workSans.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased overflow-x-hidden">
        <PremiumProvider>
          {children}
        </PremiumProvider>
      </body>
    </html>
  );
}
