"use client";
import { useState, useRef } from "react";

const PROXY_BASE = "https://your-worker.workers.dev/?url=";

export default function ProxyPage() {
  const [input, setInput] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const iframeRef = useRef(null);

  function buildProxyUrl(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    const isUrl = /^https?:\/\//i.test(trimmed) || /^[\w-]+\.\w{2,}/.test(trimmed);
    if (isUrl) {
      const full = /^https?:\/\//i.test(trimmed) ? trimmed : "https://" + trimmed;
      return PROXY_BASE + encodeURIComponent(full);
    }
    return PROXY_BASE + encodeURIComponent("https://www.bing.com/search?q=" + encodeURIComponent(trimmed));
  }

  function handleGo(e) {
    e?.preventDefault();
    const url = buildProxyUrl(input);
    if (!url || !iframeRef.current) return;
    iframeRef.current.src = url;
    setCurrentUrl(url);
    setLoaded(false);
  }

  return (
    <div style={{ minHeight: "calc(100vh - 58px)", display: "flex", flexDirection: "column" }}>
      <div style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "12px 1.5rem",
        display: "flex", flexDirection: "column", gap: "8px",
      }}>
        <form onSubmit={handleGo} style={{ display: "flex", gap: "8px", maxWidth: "700px" }}>
          <input
            type="text"
            placeholder="Search the web or enter a URL..."
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 14px",
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              color: "var(--text)",
              fontSize: "0.9rem",
              outline: "none",
              fontFamily: "'Syne', sans-serif",
            }}
            onFocus={e => e.target.style.borderColor = "var(--accent)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
          <button type="submit" style={{
            background: "var(--accent)", color: "#000",
            border: "none", borderRadius: "10px",
            padding: "10px 22px", fontWeight: 700,
            fontSize: "0.9rem", cursor: "pointer", whiteSpace: "nowrap",
          }}>Go →</button>
        </form>
      </div>

      <div style={{ flex: 1, position: "relative", background: "#000" }}>
        {!currentUrl && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: "12px", color: "var(--muted)",
          }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem" }}>
              Enter a search or URL above to start browsing
            </p>
            <p style={{ fontSize: "0.75rem", opacity: 0.5 }}>
              Tip: deploy your Cloudflare Worker first and update PROXY_BASE at the top of this file
            </p>
          </div>
        )}
        <iframe
          ref={iframeRef}
          style={{
            width: "100%", height: "100%",
            minHeight: "calc(100vh - 130px)",
            border: "none", display: "block",
            visibility: currentUrl ? "visible" : "hidden",
          }}
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          title="Proxy Browser"
        />
      </div>
    </div>
  );
}