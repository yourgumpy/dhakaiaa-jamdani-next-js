import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootClientLayout from "./RootClientLayout";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata: Metadata = {
  title: "Dhakaia Jamdani",
  description:
    "Dhakaia Jamdani is a traditional Bangladeshi saree made of cotton, muslin, or silk. It is a handwoven fabric made of cotton, muslin, or silk, and it is one of the finest and most expensive sarees in Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <RootClientLayout>{children}</RootClientLayout>
    </ThemeProvider>
  );
}
