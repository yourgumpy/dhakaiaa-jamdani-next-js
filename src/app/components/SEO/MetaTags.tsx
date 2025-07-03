"use client";
import Head from 'next/head';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

export default function MetaTags({
  title = "Dhakaia Jamdani - Authentic Traditional Bangladeshi Clothing",
  description = "Discover premium quality traditional Bangladeshi clothing. Handcrafted Jamdani Sharee, elegant Panjabi, and beautiful Three Piece collections with authentic cultural heritage.",
  keywords = [],
  image = "/images/og-image.jpg",
  url = "https://dhakaiaajamdani.com",
  type = "website",
  noindex = false
}: MetaTagsProps) {
  const fullImageUrl = image.startsWith('http') ? image : `https://dhakaiaajamdani.com${image}`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Dhakaia Jamdani" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@dhakaiaajamdani" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="Dhakaia Jamdani" />
      <meta name="publisher" content="Dhakaia Jamdani" />
      <meta name="copyright" content="© 2024 Dhakaia Jamdani. All rights reserved." />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Theme Colors */}
      <meta name="theme-color" content="#ef4444" />
      <meta name="msapplication-TileColor" content="#ef4444" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}