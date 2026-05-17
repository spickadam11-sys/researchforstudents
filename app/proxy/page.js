"use client";
import { useState, useRef } from "react";

// ─── REPLACE THIS with your Render URL once it's live ─────────────────────────
const PROXY_BASE = "https://proxy-scramjet.onrender.com";

function openViaProxy(rawInput) {
  let url = rawInput.trim();
  if (!url) return;
  // If they typed a search term (no dot or space), do a Google search
  if (!url.includes(".") || url.includes(" ")) {
    url = "https://www.google.com/search?q=" + encodeURIComponent(url);
  } else if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  const win = window.open("", "_blank");
  if (!win) { alert("Allow pop-ups for this site first."); return; }

  win.document.write(`<!DOCTYPE html><html><head>
<title>Loading...</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#07080f;color:#fff;font-family:sans-serif;width:100vw;height:100vh;overflow:hidden}
iframe{width:100%;height:100%;border:none;display:block}
#load{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;
      justify-content:center;background:#07080f;gap:14px;z-index:10}
.ring{width:40px;height:40px;border:3px solid #1a1a2e;border-top-color:#00e5ff;
      border-radius:50%;animation:spin 0.75s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
#msg{font-size:0.82rem;color:#555;letter-spacing:0.5px}
#x{position:fixed;top:10px;right:10px;z-index:9999;background:rgba(0,0,0,.75);
   color:#fff;border:1px solid #333;border-radius:8px;padding:5px 14px;
   cursor:pointer;font:13px sans-serif}
#x:hover{background:#1a1a1a}
</style>
</head><body>
<div id="load"><div class="ring"></div><span id="msg">Connecting...</span></div>
<button id="x" onclick="window.close()">✕ Close</button>
<iframe id="f" style="display:none" allowfullscreen></iframe>
<script src="${PROXY_BASE}/uv/uv.bundle.js"></script>
<script src="${PROXY_BASE}/uv/uv.config.js"></script>
<script>
var TARGET = ${JSON.stringify(url)};
var PROXY  = ${JSON.stringify(PROXY_BASE)};
var done   = false;

function fallback() {
  if (done) return; done = true;
  document.getElementById('msg').textContent = 'Opening directly...';
  window.location.href = TARGET;
}

function launch() {
  if (done) return;
  try {
    var cfg = window.__uv$config;
    if (!cfg || !cfg.encodeUrl) { fallback(); return; }
    done = true;
    var encoded = PROXY + cfg.prefix + cfg.encodeUrl(TARGET);
    var f = document.getElementById('f');
    document.getElementById('msg').textContent = 'Loading...';
    f.onload = function() {
      document.getElementById('load').style.display = 'none';
      f.style.display = 'block';
    };
    f.src = encoded;
  } catch(e) { fallback(); }
}

if (document.readyState === 'complete') launch();
else window.addEventListener('load', launch);
setTimeout(function(){ if(!done) fallback(); }, 8000);
</script>
</body></html>`);
  win.document.close();
}

const QUICK_LINKS = [
  { label: "Google",    url: "https://www.google.com",    icon: "🔍" },
  { label: "YouTube",   url: "https://www.youtube.com",   icon: "▶️" },
  { label: "Reddit",    url: "https://www.reddit.com",    icon: "🤖" },
  { label: "Wikipedia", url: "https://www.wikipedia.org", icon: "📖" },
  { label: "Twitter",   url: "https://www.twitter.com",   icon: "🐦" },
  { label: "GitHub",    url: "https://www.github.com",    icon: "💻" },
];

export default function ProxyPage() {
  const [input, setInput] = useState("");
  const [hover, setHover] = useState(null);
  const inputRef = useRef(null);

  function handleGo() { openViaProxy(input); }
  function handleKey(e) { if (e.key === "Enter") handleGo(); }

  return (
    <main style={{
      minHeight: "calc(100vh - 58px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1.5rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* grid background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "680px" }}>

        {/* heading */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: "0.5rem",
          }}>
            <span style={{ color: "var(--text)" }}>FREE </span>
            <span style={{ color: "var(--accent)", textShadow: "0 0 30px rgba(0,229,255,0.35)" }}>PROXY</span>
          </h1>
          <p style={{
            color: "var(--muted)",
            fontSize: "0.82rem",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.5px",
          }}>
            type a url or search term — opens in a new tab
          </p>
        </div>

        {/* search bar */}
        <div style={{
          display: "flex",
          gap: "8px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          padding: "6px 6px 6px 16px",
          marginBottom: "2rem",
          boxShadow: "0 0 30px rgba(0,229,255,0.06)",
        }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search or enter URL..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text)",
              fontSize: "1rem",
              fontFamily: "'Syne', sans-serif",
            }}
          />
          <button
            onClick={handleGo}
            style={{
              background: "var(--accent)",
              color: "#000",
              border: "none",
              borderRadius: "10px",
              padding: "10px 22px",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "opacity 0.15s",
            }}
          >
            Go →
          </button>
        </div>

        {/* quick links */}
        <div>
          <p style={{
            color: "var(--muted)",
            fontSize: "0.68rem",
            fontFamily: "'JetBrains Mono', monospace",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "0.75rem",
            textAlign: "center",
          }}>
            Quick Links
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "8px",
          }}>
            {QUICK_LINKS.map(({ label, url, icon }) => (
              <button
                key={label}
                onClick={() => openViaProxy(url)}
                onMouseEnter={() => setHover(label)}
                onMouseLeave={() => setHover(null)}
                style={{
                  background: hover === label ? "var(--surface2)" : "var(--surface)",
                  border: `1px solid ${hover === label ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: "10px",
                  padding: "12px",
                  color: hover === label ? "var(--accent)" : "var(--muted)",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* note */}
        <p style={{
          marginTop: "2rem",
          textAlign: "center",
          color: "var(--muted)",
          fontSize: "0.72rem",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          make sure pop-ups are allowed for this site
        </p>
      </div>
    </main>
  );
}