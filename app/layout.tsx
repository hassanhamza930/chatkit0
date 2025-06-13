import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "ChatKit0-t3.chat clone",
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
        className={`antialiased bg-zinc-950 h-screen w-full`}
      >
        {children}
      </body>
    </html>
  );
}
