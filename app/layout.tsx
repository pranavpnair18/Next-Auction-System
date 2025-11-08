"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "./navbar/Navbar";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <SessionProvider>
          <Navbar/>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
