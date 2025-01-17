import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "styles/globals.css";
import { SWRProvider } from "./swr-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={inter.className}>
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
