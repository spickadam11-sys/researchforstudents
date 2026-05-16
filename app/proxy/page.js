"use client";
import { useState, useRef } from "react";

const PROXY_URL = "proxy-production-a233.up.railway.app";

export default function ProxyPage() {
  const [active, setActive] = useState(false);
  const iframeRef = useRef(null);

  const quickLinks = [
    { label: "Google", url: "https://google.com" },
    { label: "YouTube", url: "https://youtube.com" },
    { label: "Wikipedia", url: "https://wikipedia.org" },
    { label: "Reddit", url: "https://reddit.com" },
  ];

  if (active) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 500, display: "flex", flexDirection: "column" }}>
        <div style={{
          height: "44px",
          background: "rgba(7,8,15,0.95)",
          borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center",
          padding: "0 1rem", gap: "8px", flexShrink: 0,
        }}>
          <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.9rem", fontFamily: "'Syne', sans-serif" }}>
            Web Proxy
          </span>
          <div style={{ flex: 1 }} />
          <button
            onClick={() => iframeRef.current?.requestFullscreen?.()}
            style={{
              background: "var(--surface2)", color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: "7px", padding: "5px 12px",
              cursor: "pointer", fontSize: "0.8rem", fontWeight: 600,
            }}>
            ⛶ Fullscreen
          </button>
          <button onClick={() => setActive(false)} style={{
            background: "rgba(255,60,172,0.15)", color: "#ff3cac",
            border: "1px solid rgba(255,60,172,0.3)",
            borderRadius: "7px", padding: "5px 12px",
            cursor: "pointer", fontSize: "0.8rem", fontWeight: 600,
          }}>✕ Close</button>
        </div>

        <iframe
          ref={iframeRef}
          src={PROXY_URL}
          style={{ flex: 1, border: "none", width: "100%", display: "block" }}
          allowFullScreen
          title="Proxy Browser"
        />
      </div>
    );
  }

  return (
    <main style={{ minHeight: "calc(100vh - 58px)", padding: "3rem 1.5rem", maxWidth: "700px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: "8px" }}>
          Web <span style={{ color: "var(--accent)" }}>Proxy</span>
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "0.85rem", fontFamily: "'JetBrains Mono', monospace" }}>
          browse freely · stays in this tab
        </p>
      </div>

      <button onClick={() => setActive(true)} style={{
        width: "100%",
        padding: "16px",
        background: "var(--accent)", color: "#000",
        border: "none", borderRadius: "12px",
        fontWeight: 800, fontSize: "1.1rem",
        cursor: "pointer", marginBottom: "2.5rem",
        letterSpacing: "-0.3px",
      }}>
        Open Proxy →
      </button>

      <p style={{ color: "var(--muted)", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
        Quick Access
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
        {quickLinks.map(({ label }) => (
          <button key={label} onClick={() => setActive(true)}
            style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: "10px", padding: "14px 18px",
              color: "var(--text)", cursor: "pointer",
              textAlign: "left", fontSize: "0.9rem", fontWeight: 600,
              fontFamily: "'Syne', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}
          >
            {label} <span style={{ opacity: 0.4 }}>↗</span>
          </button>
        ))}
      </div>
    </main>
  );
}