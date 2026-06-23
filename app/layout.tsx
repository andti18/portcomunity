import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ClerkProvider } from '@clerk/nextjs';
const outfit = Outfit({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "iBuiltThis",
  description: "Platform to share projects portofolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <ClerkProvider>
    <html
      lang="en"
      className={cn("h-full", "antialiased", outfit.className)}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  </ClerkProvider>
  );
}
