import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "styles/globals.css";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Box>{children}</Box>;
}
