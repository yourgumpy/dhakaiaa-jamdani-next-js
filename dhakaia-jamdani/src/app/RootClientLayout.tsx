"use client";

import { useEffect } from "react";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import "./globals.css";
import Footer from "./components/footer";
import { useTheme } from "./context/ThemeContext"; // Ensure the path to ThemeContext is correct
import { Provider } from "react-redux";
import store from "./store/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Provider store={store}>
      <html lang="en">
      <head>
      <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className={inter.className}>
        <div>
          <Navbar isChecked={theme === 'light'} onToggle={toggleTheme} />
        </div>
        {children}
        <Footer />
      </body>
    </html>
    </Provider>
  );
}
