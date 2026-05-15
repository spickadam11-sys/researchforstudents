"use client";
import "./globals.css";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>ResearchforStudents</title>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-N2G5GBXDWM"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-N2G5GBXDWM');
        `}} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <TitleSpoof />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

function TitleSpoof() {
  useEffect(() => {
    document.title = "ResearchforStudents";
  }, []);
  return null;
}

function Navbar() {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 200,
      background: "rgba(7,8,15,0.85)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--border)",
      height: "58px",
      display: "flex", alignItems: "center",
      padding: "0 1.5rem",
      justifyContent: "space-between",
    }}>
      <a href="/" style={{ textDecoration: "none" }}>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "1.3rem",
          letterSpacing: "-0.5px",
          color: "var(--accent)",
          textShadow: "0 0 20px rgba(0,229,255,0.4)",
        }}>RESEARCH<span style={{ color: "var(--text)" }}>forstudents</span></span>
      </a>
      <div style={{ display: "flex", gap: "4px" }}>
        {[
          { label: "Games", href: "/games" },
          { label: "Proxy", href: "/proxy" },
        ].map(({ label, href }) => (
          <a key={href} href={href} style={{
            textDecoration: "none",
            color: "var(--muted)",
            padding: "6px 14px",
            borderRadius: "8px",
            fontSize: "0.88rem",
            fontWeight: 600,
            border: "1px solid transparent",
          }}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}