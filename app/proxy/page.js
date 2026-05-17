"use client";
import { useState, useRef } from "react";

const PROXY_BASE = "https://proxy-scramjet.onrender.com";

function openViaProxy(rawInput, title) {
  let url = typeof rawInput === "string" ? rawInput.trim() : rawInput;
  if (!url) return;
  if (!url.includes(".") || url.includes(" ")) {
    url = "https://www.google.com/search?q=" + encodeURIComponent(url);
  } else if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  const win = window.open("", "_blank");
  if (!win) { alert("Allow pop-ups for this site first."); return; }

  win.document.write(`<!DOCTYPE html><html><head>
<title>${title || "Loading..."}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#07080f;color:#fff;font-family:sans-serif;width:100vw;height:100vh;overflow:hidden}
iframe{width:100%;height:100%;border:none;display:block}
#load{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;
      justify-content:center;background:#07080f;gap:14px;z-index:10}
.ring{width:40px;height:40px;border:3px solid #1a1a2e;border-top-color:#00e5ff;
      border-radius:50%;animation:spin 0.75s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
#msg{font-size:0.82rem;color:#fff;letter-spacing:0.5px}
#sub{font-size:0.72rem;color:#555;margin-top:-6px}
#x{position:fixed;top:10px;right:10px;z-index:9999;background:rgba(0,0,0,.75);
   color:#fff;border:1px solid #333;border-radius:8px;padding:5px 14px;
   cursor:pointer;font:13px sans-serif}
#x:hover{background:#1a1a1a}
</style>
</head><body>
<div id="load">
  <div class="ring"></div>
  <span id="msg">Connecting to proxy...</span>
  <span id="sub">this may take ~20s if the proxy is waking up</span>
</div>
<button id="x" onclick="window.close()">✕ Close</button>
<iframe id="f" style="display:none" allowfullscreen></iframe>

<script>
var TARGET = ${JSON.stringify(url)};
var PROXY  = ${JSON.stringify(PROXY_BASE)};
var done   = false;
var elapsed = 0;
var maxWaitSeconds = 45; // Give it a long patience window

var ticker = setInterval(function() {
  elapsed++;
  if (elapsed === 5)  document.getElementById('msg').textContent = 'Still connecting...';
  if (elapsed === 12) document.getElementById('msg').textContent = 'Proxy is waking up...';
  if (elapsed === 22) document.getElementById('msg').textContent = 'Almost there...';
  if (elapsed >= maxWaitSeconds) {
    fallback();
  }
}, 1000);

function fallback() {
  if (done) return; done = true;
  clearInterval(ticker);
  document.getElementById('msg').textContent = 'Opening directly...';
  document.getElementById('sub').textContent = 'proxy unavailable';
  setTimeout(function() { window.location.href = TARGET; }, 1200);
}

function showGame() {
  clearInterval(ticker);
  var loadEl = document.getElementById('load');
  if (loadEl) loadEl.style.display = 'none';
  document.getElementById('f').style.display = 'block';
}

function launch() {
  if (done) return;
  try {
    var cfg = window.__uv$config;
    if (!cfg || !cfg.encodeUrl) { 
      // If scripts parsed but config object isn't fully ready yet, wait and retry launch
      setTimeout(launch, 1000); 
      return; 
    }
    done = true;
    var encoded = PROXY + cfg.prefix + cfg.encodeUrl(TARGET);
    var f = document.getElementById('f');
    document.getElementById('msg').textContent = 'Loading game...';
    document.getElementById('sub').textContent = '';
    f.src = encoded;
    setTimeout(showGame, 2000);
  } catch(e) { 
    fallback(); 
  }
}

// Dynamically inject scripts to handle potential server spin-up latency safely
function loadScripts() {
  var b = document.createElement('script');
  b.src = PROXY + '/uv/uv.bundle.js';
  b.onload = function() {
    var c = document.createElement('script');
    c.src = PROXY + '/uv/uv.config.js?t=' + Date.now();
    c.onload = launch;
    c.onerror = function() { setTimeout(loadScripts, 3000); }; // loop-retry if server drops request
    document.body.appendChild(c);
  };
  b.onerror = function() { setTimeout(loadScripts, 3000); }; // loop-retry if server drops request
  document.body.appendChild(b);
}

window.onload = loadScripts;
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
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "2rem 1.5rem", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "40px 40px", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "680px" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1, marginBottom: "0.5rem" }}>
            <span style={{ color: "var(--text)" }}>FREE </span>
            <span style={{ color: "var(--accent)", textShadow: "0 0 30px rgba(0,229,255,0.35)" }}>PROXY</span>
          </h1>
          <p style={{ color: "var(--muted)", fontSize: "0.82rem", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.5px" }}>
            type a url or search term — opens in a new tab
          </p>
        </div>

        <div style={{
          display: "flex", gap: "8px",
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: "14px", padding: "6px 6px 6px 16px",
          marginBottom: "2rem", boxShadow: "0 0 30px rgba(0,229,255,0.06)",
        }}>
          <input
            ref={inputRef} type="text"
            placeholder="Search or enter URL..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: "1rem", fontFamily: "'Syne', sans-serif" }}
          />
          <button onClick={handleGo} style={{
            background: "var(--accent)", color: "#000", border: "none",
            borderRadius: "10px", padding: "10px 22px", fontWeight: 700,
            fontSize: "0.9rem", cursor: "pointer", whiteSpace: "nowrap",
          }}>
            Go →
          </button>
        </div>

        <div>
          <p style={{ color: "var(--muted)", fontSize: "0.68rem", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.75rem", textAlign: "center" }}>
            Quick Links
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "8px" }}>
            {QUICK_LINKS.map(({ label, url, icon }) => (
              <button key={label} onClick={() => openViaProxy(url)}
                onMouseEnter={() => setHover(label)} onMouseLeave={() => setHover(null)}
                style={{
                  background: hover === label ? "var(--surface2)" : "var(--surface)",
                  border: `1px solid ${hover === label ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: "10px", padding: "12px",
                  color: hover === label ? "var(--accent)" : "var(--muted)",
                  cursor: "pointer", fontSize: "0.85rem", fontWeight: 600,
                  transition: "all 0.15s", display: "flex", alignItems: "center",
                  gap: "8px", fontFamily: "'Syne', sans-serif",
                }}>
                <span>{icon}</span><span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <p style={{ marginTop: "2rem", textAlign: "center", color: "var(--muted)", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace" }}>
          make sure pop-ups are allowed for this site
        </p>
      </div>
    </main>
  );
}