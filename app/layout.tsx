import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";


export const metadata: Metadata = {
  title: "ChatKit0",
  description: "An Abstraction Experiment to combine multi-provider LLM chat based application.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ fontFamily: "Geist" }}
        className={`subpixel-antialiased bg-zinc-950 h-screen w-full`}
      >
        {children}
      </body>
    </html>
  );
}
