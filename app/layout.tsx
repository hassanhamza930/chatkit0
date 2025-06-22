import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import { Toaster } from "sonner";
import Head from "next/head";


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
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=Special+Gothic+Expanded+One&display=swap');
        </style>
      </head>
      <body
        style={{ fontFamily: "Geist" }}
        className={`subpixel-antialiased bg-zinc-950 h-screen w-full overflow-hidden`}
      >
        <Toaster position="top-right" duration={1000} richColors />
        {children}
      </body>
    </html>
  );
}
