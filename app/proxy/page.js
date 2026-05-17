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
#err{display:none;flex-direction:column;align-items:center;gap:10px;text-align:center}
#err p{color:#ff3cac;font-size:0.85rem}
#err small{color:#555;font-size:0.72rem}
#retry-btn{background:#00e5ff;color:#000;border:none;border-radius:8px;
           padding:8px 20px;font-weight:700;cursor:pointer;font-size:0.85rem}
</style>
</head><body>
<div id="load">
  <div id="spinner-wrap">
    <div class="ring"></div>
  </div>
  <span id="msg">Connecting to proxy...</span>
  <span id="sub">checking server status...</span>
  <div id="err">
    <p>Could not connect to proxy server.</p>
    <small>The server may be down or unreachable.</small>
    <button id="retry-btn" onclick="startFresh()">Try Again</button>
  </div>
</div>
<button id="x" onclick="window.close()">✕ Close</button>
<iframe id="f" style="display:none" allowfullscreen></iframe>

<script>
var TARGET  = ${JSON.stringify(url)};
var PROXY   = ${JSON.stringify(PROXY_BASE)};
var done    = false;
var retries = 0;
var MAX_RETRIES = 5;

function setMsg(msg, sub) {
  var m = document.getElementById('msg');
  var s = document.getElementById('sub');
  if (m && msg !== undefined) m.textContent = msg;
  if (s && sub !== undefined) s.textContent = sub;
}

function showError() {
  var spinner = document.getElementById('spinner-wrap');
  var err = document.getElementById('err');
  if (spinner) spinner.style.display = 'none';
  if (err) err.style.display = 'flex';
  setMsg('Connection failed', '');
}

function showGame() {
  var loadEl = document.getElementById('load');
  if (loadEl) loadEl.style.display = 'none';
  document.getElementById('f').style.display = 'block';
}

function launch() {
  if (done) return;
  // Small delay to ensure uv.config.js has fully executed and set window.__uv$config
  setTimeout(function() {
    try {
      var cfg = window.__uv$config;
      if (!cfg || !cfg.encodeUrl || !cfg.prefix) {
        // Config not ready yet — retry script loading if under limit
        scheduleRetry('Config not ready, retrying...');
        return;
      }
      done = true;
      var encoded = PROXY + cfg.prefix + cfg.encodeUrl(TARGET);
      var f = document.getElementById('f');
      setMsg('Loading proxy session...', '');
      f.src = encoded;
      setTimeout(showGame, 2000);
    } catch(e) {
      scheduleRetry('Error initializing, retrying...');
    }
  }, 300); // 300ms grace period after script load
}

function scheduleRetry(msg) {
  retries++;
  if (retries >= MAX_RETRIES) {
    showError();
    return;
  }
  setMsg(msg || 'Retrying...', 'attempt ' + retries + ' of ' + MAX_RETRIES);
  setTimeout(loadScripts, 2000);
}

function loadScripts() {
  if (done) return;

  // Remove any previous script attempts
  document.querySelectorAll('.uv-script').forEach(function(el) { el.remove(); });

  var bundle = document.createElement('script');
  bundle.className = 'uv-script';
  bundle.src = PROXY + '/uv/uv.bundle.js?t=' + Date.now();

  bundle.onload = function() {
    var config = document.createElement('script');
    config.className = 'uv-script';
    config.src = PROXY + '/uv/uv.config.js?t=' + Date.now();
    config.onload = launch;
    config.onerror = function() { scheduleRetry('Config script failed, retrying...'); };
    document.body.appendChild(config);
  };

  bundle.onerror = function() {
    scheduleRetry('Bundle script failed, retrying...');
  };

  document.body.appendChild(bundle);
}

function startFresh() {
  // Reset state for manual retry
  done = false;
  retries = 0;
  var spinner = document.getElementById('spinner-wrap');
  var err = document.getElementById('err');
  if (spinner) spinner.style.display = 'block';
  if (err) err.style.display = 'none';
  setMsg('Reconnecting...', 'pinging server...');
  pingAndLoad();
}

function pingAndLoad() {
  // Fetch the proxy health endpoint first to confirm the server is awake.
  // This avoids loading scripts against a sleeping/cold server.
  setMsg('Connecting to proxy...', 'pinging server...');

  fetch(PROXY + '/uv/uv.bundle.js', { method: 'HEAD', cache: 'no-store' })
    .then(function(res) {
      if (res.ok) {
        setMsg('Server is up!', 'loading proxy scripts...');
        loadScripts();
      } else {
        // Server responded but with an error — still try loading
        setMsg('Server responded, loading...', '');
        loadScripts();
      }
    })
    .catch(function() {
      // Server not reachable yet — wait and retry ping
      if (retries >= MAX_RETRIES) { showError(); return; }
      retries++;
      var wait = retries < 3 ? 3 : 5;
      setMsg(
        retries < 2 ? 'Waking up server...' :
        retries < 4 ? 'Still starting up...' : 'Almost there...',
        'retry ' + retries + ' of ' + MAX_RETRIES + ' — waiting ' + wait + 's'
      );
      setTimeout(pingAndLoad, wait * 1000);
    });
}

// Kick off with a health ping instead of blindly loading scripts
window.onload = pingAndLoad;
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