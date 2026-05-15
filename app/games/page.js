"use client";
import { useState } from "react";

const GAMES = [
  {
    id: "1v1lol",
    name: "1v1.LOL",
    image: "/Thumbnails/1v1-lol.png",
    url: "https://1v1-lol-online.github.io/file/",
    tags: ["shooting", "building", "multiplayer"],
  },
  {
    id: "monkeymart",
    name: "Monkey Mart",
    image: "/Thumbnails/monkey.png",
    url: "https://petezahgames.com/storage/ag/arsenic/monkey-mart/",
    tags: ["idle", "casual"],
  },
  {
    id: "coreball",
    name: "Core Ball",
    image: "/Thumbnails/core-ball_png.png",
    url: "https://petezahgames.com/storage/ag/arsenic/core-ball/",
    tags: ["arcade", "skill"],
  },
  {
    id: "dancefire",
    name: "Dance of Fire & Ice",
    image: "/Thumbnails/dance-of-fire-and-ice.png",
    url: "https://htmlxm.github.io/h8/a-dance-of-fire-and-ice/",
    tags: ["rhythm", "music", "hard"],
  },
  {
    id: "geodash",
    name: "Geometry Dash",
    image: "/Thumbnails/geo.png",
    url: "https://geometrylitepc.io/geo-dash-lite-pc.embed",
    tags: ["platformer", "rhythm", "hard"],
  },
  {
    id: "punchout",
    name: "Punch-Out!!",
    image: "/Thumbnails/punch_out.png",
    url: "https://script.google.com/macros/s/AKfycbynjAGdyrbVCrVZEwHnX7mQ5d0ktAl6TswcFfiMNmAxayyMCJyBdmyuRx6ya2R2p_uq/exec",
    tags: ["boxing", "retro", "fighting"],
  },
  {
    id: "rooftop",
    name: "Rooftop Snipers",
    image: "/Thumbnails/rooftop_snipers.png",
    url: "https://htmlxm.github.io/h/rooftop-snipers/",
    tags: ["shooting", "2-player", "casual"],
  },
];

function openAboutBlank(url) {
  const win = window.open("", "_blank");
  if (!win) { alert("Allow pop-ups for this site first."); return; }
  win.document.write(`<!DOCTYPE html><html><head><title>about:blank</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#000;width:100vw;height:100vh;overflow:hidden}
iframe{width:100%;height:100%;border:none;display:block}
#x{position:fixed;top:10px;right:10px;z-index:9999;background:rgba(0,0,0,.7);color:#fff;
border:1px solid #333;border-radius:8px;padding:5px 13px;cursor:pointer;font:13px sans-serif}
#x:hover{background:#222}</style></head>
<body><button id="x" onclick="window.close()">✕ Close</button>
<iframe src="${url}" allowfullscreen></iframe></body></html>`);
  win.document.close();
}

export default function GamesPage() {
  const [search, setSearch] = useState("");
  const [activeGame, setActiveGame] = useState(null);

  const filtered = GAMES.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.tags.some(t => t.includes(search.toLowerCase()))
  );

  if (activeGame) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 500, display: "flex", flexDirection: "column" }}>
        <div style={{
          height: "44px", background: "rgba(7,8,15,0.95)",
          borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 1rem", flexShrink: 0,
        }}>
          <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--accent)" }}>{activeGame.name}</span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => {
                const iframe = document.getElementById("game-iframe");
                if (iframe?.requestFullscreen) iframe.requestFullscreen();
              }}
              style={{
                background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)",
                borderRadius: "7px", padding: "4px 12px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600,
              }}>
              ⛶ Fullscreen
            </button>
            <button
              onClick={() => setActiveGame(null)}
              style={{
                background: "rgba(255,60,172,0.15)", color: "#ff3cac", border: "1px solid rgba(255,60,172,0.3)",
                borderRadius: "7px", padding: "4px 12px", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600,
              }}>
              ✕ Close
            </button>
          </div>
        </div>
        <iframe
          id="game-iframe"
          src={activeGame.url}
          style={{ flex: 1, border: "none", width: "100%", display: "block" }}
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <main style={{ minHeight: "calc(100vh - 58px)", padding: "2rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: "4px" }}>Games</h1>
        <p style={{ color: "var(--muted)", fontSize: "0.85rem", fontFamily: "'JetBrains Mono', monospace" }}>
          {GAMES.length} games — click to play
        </p>
      </div>

      <div style={{ position: "relative", maxWidth: "380px", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Search games or tags..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            background: "var(--surface)",
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
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
        gap: "1.1rem",
      }}>
        {filtered.map(game => (
          <GameCard key={game.id} game={game} onPlayInTab={() => setActiveGame(game)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "5rem", color: "var(--muted)" }}>
          No games match "{search}"
        </div>
      )}
    </main>
  );
}

function GameCard({ game, onPlayInTab }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        background: "var(--surface)",
        border: `1px solid ${hover ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "var(--card-radius)",
        overflow: "hidden",
        transition: "all 0.18s",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hover ? "0 8px 30px rgba(0,229,255,0.12)" : "none",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ position: "relative", aspectRatio: "16/10", background: "var(--surface2)", overflow: "hidden" }}>
        <img
          src={game.image}
          alt={game.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hover ? "scale(1.05)" : "scale(1)", transition: "transform 0.3s" }}
          onError={e => { e.target.style.display = "none"; }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(7,8,15,0.85)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "8px",
          opacity: hover ? 1 : 0,
          transition: "opacity 0.2s",
        }}>
          <button
            onClick={e => { e.stopPropagation(); onPlayInTab(); }}
            style={{
              background: "var(--accent)", color: "#000",
              border: "none", borderRadius: "8px",
              padding: "8px 20px", fontWeight: 700, fontSize: "0.82rem",
              cursor: "pointer", width: "140px",
            }}>
            ▶ Play Here
          </button>
          <button
            onClick={e => { e.stopPropagation(); openAboutBlank(game.url); }}
            style={{
              background: "transparent", color: "var(--text)",
              border: "1px solid var(--border)", borderRadius: "8px",
              padding: "7px 20px", fontWeight: 600, fontSize: "0.82rem",
              cursor: "pointer", width: "140px",
            }}>
            ↗ New Tab
          </button>
        </div>
      </div>

      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: "6px" }}>{game.name}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {game.tags.map(tag => (
            <span key={tag} style={{
              fontSize: "0.62rem",
              background: "var(--surface2)",
              color: "var(--muted)",
              padding: "2px 7px",
              borderRadius: "5px",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              fontFamily: "'JetBrains Mono', monospace",
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}