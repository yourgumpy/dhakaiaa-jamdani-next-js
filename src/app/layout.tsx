import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootClientLayout from "./RootClientLayout";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dhakaiaajamdani.com'),
  title: {
    default: "Dhakaia Jamdani - Authentic Traditional Bangladeshi Clothing | Premium Sharee, Panjabi & Three Piece",
    template: "%s | Dhakaia Jamdani - Traditional Bangladeshi Fashion"
  },
  description: "Discover authentic Bangladeshi traditional wear at Dhakaia Jamdani. Premium quality Jamdani Sharee, elegant Panjabi, and beautiful Three Piece collections. Handcrafted with heritage, delivered worldwide. Shop now for authentic cultural fashion.",
  keywords: [
    "Dhakaia Jamdani",
    "Bangladeshi traditional clothing",
    "Jamdani Sharee",
    "Traditional Panjabi",
    "Three Piece collection",
    "Bangladeshi fashion",
    "Handwoven Jamdani",
    "Cultural clothing",
    "Traditional wear",
    "Authentic Bangladeshi dress",
    "Dhaka fashion",
    "Heritage clothing",
    "Ethnic wear Bangladesh",
    "Traditional textile",
    "Handcrafted clothing"
  ],
  authors: [{ name: "Dhakaia Jamdani Team" }],
  creator: "Dhakaia Jamdani",
  publisher: "Dhakaia Jamdani",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dhakaiaajamdani.com',
    siteName: 'Dhakaia Jamdani',
    title: 'Dhakaia Jamdani - Authentic Traditional Bangladeshi Clothing',
    description: 'Discover premium quality traditional Bangladeshi clothing. Handcrafted Jamdani Sharee, elegant Panjabi, and beautiful Three Piece collections with authentic cultural heritage.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dhakaia Jamdani - Traditional Bangladeshi Clothing Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dhakaiaajamdani',
    creator: '@dhakaiaajamdani',
    title: 'Dhakaia Jamdani - Authentic Traditional Bangladeshi Clothing',
    description: 'Premium quality traditional Bangladeshi clothing. Handcrafted with heritage, delivered worldwide.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://dhakaiaajamdani.com',
    languages: {
      'en-US': 'https://dhakaiaajamdani.com',
      'bn-BD': 'https://dhakaiaajamdani.com/bn',
    },
  },
  category: 'fashion',
  classification: 'Traditional Clothing E-commerce',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Dhakaia Jamdani',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#ef4444',
    'theme-color': '#ef4444',
  },
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