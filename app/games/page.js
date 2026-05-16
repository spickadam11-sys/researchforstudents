"use client";
import { useState, useMemo } from "react";

// ─── Proxy config ────────────────────────────────────────────────────────────
const PROXY_BASE = "https://proxy-production-a233.up.railway.app";

/**
 * Wraps a game URL through the proxy.
 * Adjust the format here if your proxy uses a different scheme, e.g.:
 *   `${PROXY_BASE}/service/${encodeURIComponent(url)}`
 */
function proxied(url) {
  return `${PROXY_BASE}/?url=${encodeURIComponent(url)}`;
}

// ─── Game list ────────────────────────────────────────────────────────────────
const GAMES = [
  // A
  {
    id: "1v1lol",
    name: "1v1.LOL",
    image: "/Thumbnails/1v1_lol.png",
    url: proxied("https://1v1-lol-online.github.io/"),
    tags: ["shooting", "building", "multiplayer"],
  },
  {
    id: "2048",
    name: "2048",
    image: "/Thumbnails/2048.png",
    url: proxied("https://play2048.co/"),
    tags: ["puzzle", "casual"],
  },
  {
    id: "amongus",
    name: "Among Us",
    image: "/Thumbnails/among_us.png",
    url: proxied("https://www.amongus.onl/"),
    tags: ["multiplayer", "social"],
  },
  // B
  {
    id: "basketbros",
    name: "Basket Bros",
    image: "/Thumbnails/basket_bros.png",
    url: proxied("https://basketbros.io/"),
    tags: ["sports", "2-player"],
  },
  {
    id: "basketrandom",
    name: "Basket Random",
    image: "/Thumbnails/basket_random.png",
    url: proxied("https://files.twoplayergames.org/files/games/other/Basket_Random/index.html"),
    tags: ["sports", "random", "2-player"],
  },
  {
    id: "bblegends",
    name: "Basketball Legends 2020",
    image: "/Thumbnails/basketball_legends_2020.png",
    url: proxied("https://mathgames66.github.io/p/bblegends2020.html"),
    tags: ["sports", "basketball"],
  },
  {
    id: "bballstars",
    name: "Basketball Stars",
    image: "/Thumbnails/basketball_stars.png",
    url: proxied("https://basketballstars-online.github.io/"),
    tags: ["sports", "basketball", "multiplayer"],
  },
  {
    id: "bigshotboxing",
    name: "Big Shot Boxing",
    image: "/Thumbnails/big_shot_boxing.png",
    url: proxied("https://bigshot-boxing.github.io/"),
    tags: ["boxing", "sports"],
  },
  {
    id: "bikeobby",
    name: "Bike Obby",
    image: "/Thumbnails/bike_obby.png",
    url: proxied("https://www.twoplayergames.org/embed/obby-on-a-bike"),
    tags: ["casual", "racing"],
  },
  {
    id: "blackjack",
    name: "Blackjack",
    image: "/Thumbnails/blackjack.png",
    url: proxied("https://games.arkadium.com/games/blackjack"),
    tags: ["card", "casino"],
  },
  {
    id: "bloonstd",
    name: "Bloons TD",
    image: "/Thumbnails/bloons_td.png",
    url: proxied("https://bloonstowerdefense.io/"),
    tags: ["strategy", "tower defense"],
  },
  {
    id: "boxingrandom",
    name: "Boxing Random",
    image: "/Thumbnails/boxing_random.png",
    url: proxied("https://files.twoplayergames.org/files/games/other/Boxing_Random/index.html"),
    tags: ["boxing", "random", "2-player"],
  },
  // C
  {
    id: "chess",
    name: "Chess",
    image: "/Thumbnails/chess.png",
    url: proxied("https://chessnextmove.ai/chess-2-players"),
    tags: ["strategy", "2-player", "board"],
  },
  {
    id: "clusterrush",
    name: "Cluster Rush",
    image: "/Thumbnails/cluster_rush.png",
    url: proxied("https://cluster-rush-games.github.io/"),
    tags: ["platformer", "skill"],
  },
  {
    id: "coreball",
    name: "Core Ball",
    image: "/Thumbnails/core_ball.png",
    url: proxied("https://petezahgames.com/storage/ag/arsenic/core-ball/"),
    tags: ["arcade", "skill"],
  },
  // D
  {
    id: "dancefire",
    name: "Dance of Fire & Ice",
    image: "/Thumbnails/a_dance_of_fire_and_ice.png",
    url: proxied("https://htmlxm.github.io/h8/a-dance-of-fire-and-ice/"),
    tags: ["rhythm", "music", "hard"],
    scale: 1.5,
  },
  {
    id: "drifthunters",
    name: "Drift Hunters",
    image: "/Thumbnails/drift_hunters.png",
    url: proxied("https://drift-hunters.co/"),
    tags: ["racing", "cars"],
  },
  {
    id: "dunedash",
    name: "Dune Dash",
    image: "/Thumbnails/dune_dash.png",
    url: proxied("https://sites.google.com/view/dune-dash/"),
    tags: ["platformer", "casual"],
  },
  // E
  {
    id: "escaperoad",
    name: "Escape Road",
    image: "/Thumbnails/escape_road.png",
    url: proxied("https://escaperoad.io/"),
    tags: ["racing", "survival"],
  },
  // F
  {
    id: "fireboywater",
    name: "Fireboy & Watergirl",
    image: "/Thumbnails/fireboy_and_watergirl.png",
    url: proxied("https://fireboy-and-watergirl.gitlab.io/"),
    tags: ["puzzle", "2-player", "platformer"],
  },
  {
    id: "fnae",
    name: "5 Nights at Epsteins",
    image: "/Thumbnails/five_nights_at_epsteins.png",
    url: proxied("https://qz-games.github.io/Games/game.html?id=five+nights+at+epsteins"),
    tags: ["horror", "strategy"],
  },
  {
    id: "footballbros",
    name: "Football Bros",
    image: "/Thumbnails/football_bros.png",
    url: proxied("https://footballbros.io"),
    tags: ["sports", "football", "2-player"],
  },
  {
    id: "fruitmerge",
    name: "Fruit Merge",
    image: "/Thumbnails/fruit_merge.png",
    url: proxied("https://plays.org/fruit-merge/"),
    tags: ["puzzle", "casual"],
  },
  // G
  {
    id: "geodash",
    name: "Geometry Dash",
    image: "/Thumbnails/geo.png",
    url: proxied("https://geometrylitepc.io/geo-dash-lite-pc.embed"),
    tags: ["platformer", "rhythm", "hard"],
  },
  {
    id: "getawayshootout",
    name: "Getaway Shootout",
    image: "/Thumbnails/getaway_shootout.png",
    url: proxied("https://getawayshootoutonline.github.io/"),
    tags: ["shooting", "2-player", "casual"],
  },
  {
    id: "gladihoppers",
    name: "Gladihoppers",
    image: "/Thumbnails/gladihoppers.png",
    url: proxied("https://gladihoppers.io/"),
    tags: ["fighting", "2-player"],
  },
  {
    id: "granny",
    name: "Granny",
    image: "/Thumbnails/granny.png",
    url: proxied("/wp-content/uploads/games/granny/"),
    tags: ["horror", "survival"],
  },
  {
    id: "gunspin",
    name: "Gunspin",
    image: "/Thumbnails/gunspin.png",
    url: proxied("https://mathgames66.github.io/p/gunspin.html"),
    tags: ["arcade", "casual"],
  },
  // H
  {
    id: "hardestgame",
    name: "World's Hardest Game",
    image: "/Thumbnails/hardest_game.png",
    url: proxied("https://mathgames66.github.io/p/theworldshardestgame.html"),
    tags: ["puzzle", "hard", "skill"],
  },
  {
    id: "headsoccer",
    name: "Head Soccer",
    image: "/Thumbnails/head_soccer.png",
    url: proxied("https://www.hoodamath.com/games/headsoccer.html"),
    tags: ["sports", "soccer", "2-player"],
  },
  {
    id: "helixjump",
    name: "Helix Jump",
    image: "/Thumbnails/helix_jump.png",
    url: proxied("https://helix-jump.com/"),
    tags: ["arcade", "casual"],
  },
  {
    id: "holeio",
    name: "Hole.io",
    image: "/Thumbnails/hole_io.png",
    url: proxied("https://holeioonline.github.io/"),
    tags: ["io", "multiplayer", "casual"],
  },
  // I
  {
    id: "idlebreakout",
    name: "Idle Breakout",
    image: "/Thumbnails/idle_breakout.png",
    url: proxied("https://mathgames66.github.io/p/idlebreakout.html"),
    tags: ["idle", "casual"],
  },
  // K
  {
    id: "krunkerio",
    name: "Krunker.io",
    image: "/Thumbnails/krunker_io.png",
    url: proxied("https://krunker.io/"),
    tags: ["shooting", "io", "multiplayer"],
  },
  // L
  {
    id: "level67",
    name: "Level 67",
    image: "/Thumbnails/level_67.png",
    url: proxied("https://geometry-games.io/dashmetry-67"),
    tags: ["platformer", "rhythm", "hard"],
  },
  {
    id: "leveldevil",
    name: "Level Devil",
    image: "/Thumbnails/levil_devil.png",
    url: proxied("https://leveldevil-unblocked.github.io/"),
    tags: ["platformer", "hard", "troll"],
  },
  // M
  {
    id: "monkeymart",
    name: "Monkey Mart",
    image: "/Thumbnails/monkey_mart.png",
    url: proxied("https://petezahgames.com/storage/ag/arsenic/monkey-mart/"),
    tags: ["idle", "casual"],
  },
  {
    id: "motox3m",
    name: "Moto X3M",
    image: "/Thumbnails/moto_x3m.png",
    url: proxied("https://mathgames66.github.io/p/motox3m.html"),
    tags: ["racing", "stunt"],
  },
  // O
  {
    id: "onlyup",
    name: "Only Up",
    image: "/Thumbnails/only_up.png",
    url: proxied("https://script.google.com/macros/s/AKfycbwMccc783yv5Ftx2nkZ6BpHDi66OYtby8TRsYzgDufHka0zzRHHcV19NgtnFJH0ltbEvQ/exec"),
    tags: ["platformer", "hard"],
  },
  {
    id: "ovo",
    name: "OvO",
    image: "/Thumbnails/ovo.png",
    url: proxied("https://playovoonline.com/"),
    tags: ["platformer", "skill"],
  },
  // P
  {
    id: "paperio",
    name: "Paper.io",
    image: "/Thumbnails/paper_io.png",
    url: proxied("https://ragdoll-archers.github.io/paper-io-2/index.html"),
    tags: ["io", "casual", "multiplayer"],
  },
  {
    id: "penaltyshot",
    name: "Penalty Shot",
    image: "/Thumbnails/penalty_shot.png",
    url: proxied("https://penaltykick-online.com/"),
    tags: ["sports", "soccer"],
  },
  {
    id: "pingpongchaos",
    name: "Ping Pong Chaos",
    image: "/Thumbnails/ping_pong_chaos.png",
    url: proxied("https://houseof-hazards.com/game/ping-pong-chaos/"),
    tags: ["sports", "casual", "2-player"],
  },
  {
    id: "polytrack",
    name: "Polytrack",
    image: "/Thumbnails/polytrack.png",
    url: proxied("https://kodub.itch.io/polytrack"),
    tags: ["racing", "casual"],
  },
  {
    id: "pool",
    name: "Pool",
    image: "/Thumbnails/pool.png",
    url: proxied("https://www.247pool.com/"),
    tags: ["sports", "casual"],
  },
  {
    id: "punchout",
    name: "Punch-Out!!",
    image: "/Thumbnails/punch_out.png",
    url: proxied("https://script.google.com/macros/s/AKfycbynjAGdyrbVCrVZEwHnX7mQ5d0ktAl6TswcFfiMNmAxayyMCJyBdmyuRx6ya2R2p_uq/exec"),
    tags: ["boxing", "retro", "fighting"],
  },
  // R
  {
    id: "retrobowl",
    name: "Retro Bowl",
    image: "/Thumbnails/retro_bowl.png",
    url: proxied("https://mathgames66.github.io/p/retrobowl.html"),
    tags: ["sports", "football", "retro"],
  },
  {
    id: "retrobowlcollege",
    name: "Retro Bowl College",
    image: "/Thumbnails/retro_bowl_college.png",
    url: proxied("https://retrobowl-college.io/"),
    tags: ["sports", "football"],
  },
  {
    id: "rooftopsnipers",
    name: "Rooftop Snipers",
    image: "/Thumbnails/rooftop_snipers.png",
    url: proxied("https://htmlxm.github.io/h/rooftop-snipers/"),
    tags: ["shooting", "2-player", "casual"],
  },
  {
    id: "run",
    name: "Run",
    image: "/Thumbnails/run.png",
    url: proxied("https://www.twoplayergames.org/embed/run-3d"),
    tags: ["platformer", "endless"],
  },
  // S
  {
    id: "slope",
    name: "Slope",
    image: "/Thumbnails/slope.png",
    url: proxied("https://slope-game.github.io/"),
    tags: ["arcade", "skill", "endless"],
  },
  {
    id: "slowroads",
    name: "Slow Roads",
    image: "/Thumbnails/slow_roads.png",
    url: proxied("https://slowroads.io/"),
    tags: ["driving", "relaxing"],
  },
  {
    id: "snowrider",
    name: "Snow Rider 3D",
    image: "/Thumbnails/snow_rider_3d.png",
    url: proxied("https://snow-rider3d.github.io/"),
    tags: ["racing", "winter"],
  },
  {
    id: "soccerbros",
    name: "Soccer Bros",
    image: "/Thumbnails/soccer_bros.png",
    url: proxied("https://soccerbros.io/"),
    tags: ["sports", "soccer", "2-player"],
  },
  {
    id: "soccerbros2",
    name: "Soccer Bros 2",
    image: "/Thumbnails/soccer_bros_2.png",
    url: proxied("https://soccer-bros.net/game/soccer-bros-2/"),
    tags: ["sports", "soccer", "2-player"],
  },
  {
    id: "soccerrandom",
    name: "Soccer Random",
    image: "/Thumbnails/soccer_random.png",
    url: proxied("https://files.twoplayergames.org/files/games/other/Soccer_Random/index.html"),
    tags: ["sports", "soccer", "random"],
  },
  {
    id: "spacewaves",
    name: "Spacewaves",
    image: "/Thumbnails/spacewaves.png",
    url: proxied("https://spacewaves.io/"),
    tags: ["arcade", "skill"],
  },
  // T
  {
    id: "tag",
    name: "Tag",
    image: "/Thumbnails/tag.png",
    url: proxied("https://taggame.io/"),
    tags: ["casual", "multiplayer"],
  },
  {
    id: "tetris",
    name: "Tetris",
    image: "/Thumbnails/tetris.png",
    url: proxied("https://www.freetetris.org/"),
    tags: ["puzzle", "classic"],
  },
  {
    id: "texasholdem",
    name: "Texas Hold'em",
    image: "/Thumbnails/texas_holdem.png",
    url: proxied("https://games.aarp.org/games/texas-holdem-poker-sit-and-go"),
    tags: ["card", "casino"],
  },
  {
    id: "impossiblequiz",
    name: "The Impossible Quiz",
    image: "/Thumbnails/the_impossible_quiz.png",
    url: proxied("https://the-impossible-quiz.co.uk/"),
    tags: ["quiz", "casual", "hard"],
  },
  {
    id: "tictactoe",
    name: "Tic Tac Toe",
    image: "/Thumbnails/tic_tac_toe.png",
    url: proxied("https://playtictactoe.org/"),
    tags: ["board", "2-player", "classic"],
  },
  {
    id: "tinyfishing",
    name: "Tiny Fishing",
    image: "/Thumbnails/tiny_fishing.png",
    url: proxied("https://mathgames66.github.io/p/tinyfishing.html"),
    tags: ["idle", "casual"],
  },
  {
    id: "tubejumpers",
    name: "Tube Jumpers",
    image: "/Thumbnails/tube_jumpers.png",
    url: proxied("https://topvaz.com/go/tube-jumpers/"),
    tags: ["casual", "multiplayer"],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

// ─── All unique tags for the filter bar ───────────────────────────────────────
const ALL_TAGS = ["all", ...Array.from(new Set(GAMES.flatMap(g => g.tags))).sort()];

// ─── Main page ────────────────────────────────────────────────────────────────
export default function GamesPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [activeGame, setActiveGame] = useState(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return GAMES.filter(g => {
      const matchesTag = activeTag === "all" || g.tags.includes(activeTag);
      const matchesSearch =
        !q ||
        g.name.toLowerCase().includes(q) ||
        g.tags.some(t => t.includes(q));
      return matchesTag && matchesSearch;
    });
  }, [search, activeTag]);

  // ── In-page game viewer ────────────────────────────────────────────────────
  if (activeGame) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 500, display: "flex", flexDirection: "column" }}>
        <div style={{
          height: "44px",
          background: "rgba(7,8,15,0.95)",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem",
          flexShrink: 0,
        }}>
          <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--accent)" }}>
            {activeGame.name}
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => {
                const iframe = document.getElementById("game-iframe");
                if (iframe?.requestFullscreen) iframe.requestFullscreen();
              }}
              style={{
                background: "var(--surface2)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: "7px",
                padding: "4px 12px",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}>
              ⛶ Fullscreen
            </button>
            <button
              onClick={() => openAboutBlank(activeGame.url)}
              style={{
                background: "var(--surface2)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: "7px",
                padding: "4px 12px",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}>
              ↗ New Tab
            </button>
            <button
              onClick={() => setActiveGame(null)}
              style={{
                background: "rgba(255,60,172,0.15)",
                color: "#ff3cac",
                border: "1px solid rgba(255,60,172,0.3)",
                borderRadius: "7px",
                padding: "4px 12px",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}>
              ✕ Close
            </button>
          </div>
        </div>
        <iframe
          id="game-iframe"
          src={activeGame.url}
          style={{
            flex: 1,
            border: "none",
            width: activeGame.scale ? `${activeGame.scale * 100}%` : "100%",
            height: activeGame.scale ? `${activeGame.scale * 100}%` : "100%",
            display: "block",
            transform: activeGame.scale ? `scale(${1 / activeGame.scale})` : "none",
            transformOrigin: "top left",
          }}
          allowFullScreen
        />
      </div>
    );
  }

  // ── Games library ──────────────────────────────────────────────────────────
  return (
    <main style={{ minHeight: "calc(100vh - 58px)", padding: "2rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: "4px" }}>
          Games
        </h1>
        <p style={{ color: "var(--muted)", fontSize: "0.85rem", fontFamily: "'JetBrains Mono', monospace" }}>
          {GAMES.length} games — click to play
        </p>
      </div>

      {/* Search */}
      <div style={{ position: "relative", maxWidth: "380px", marginBottom: "1.25rem" }}>
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
          onFocus={e => (e.target.style.borderColor = "var(--accent)")}
          onBlur={e => (e.target.style.borderColor = "var(--border)")}
        />
      </div>

      {/* Tag filter bar */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        marginBottom: "2rem",
      }}>
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            style={{
              padding: "4px 12px",
              borderRadius: "6px",
              border: activeTag === tag ? "1px solid var(--accent)" : "1px solid var(--border)",
              background: activeTag === tag ? "rgba(0,229,255,0.12)" : "var(--surface)",
              color: activeTag === tag ? "var(--accent)" : "var(--muted)",
              fontSize: "0.68rem",
              fontFamily: "'JetBrains Mono', monospace",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1.1rem",
      }}>
        {filtered.map(game => (
          <GameCard
            key={game.id}
            game={game}
            onPlayInTab={() => setActiveGame(game)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "5rem", color: "var(--muted)" }}>
          No games match "{search}"
        </div>
      )}
    </main>
  );
}

// ─── Game card ────────────────────────────────────────────────────────────────
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
      {/* Thumbnail + hover overlay */}
      <div style={{ position: "relative", aspectRatio: "16/10", background: "var(--surface2)", overflow: "hidden" }}>
        <img
          src={game.image}
          alt={game.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hover ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.3s",
          }}
          onError={e => { e.target.style.display = "none"; }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(7,8,15,0.85)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          opacity: hover ? 1 : 0,
          transition: "opacity 0.2s",
        }}>
          <button
            onClick={e => { e.stopPropagation(); onPlayInTab(); }}
            style={{
              background: "var(--accent)",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              padding: "8px 20px",
              fontWeight: 700,
              fontSize: "0.82rem",
              cursor: "pointer",
              width: "140px",
            }}>
            ▶ Play Here
          </button>
          <button
            onClick={e => { e.stopPropagation(); openAboutBlank(game.url); }}
            style={{
              background: "transparent",
              color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "7px 20px",
              fontWeight: 600,
              fontSize: "0.82rem",
              cursor: "pointer",
              width: "140px",
            }}>
            ↗ New Tab
          </button>
        </div>
      </div>

      {/* Name + tags */}
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: "6px" }}>
          {game.name}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {game.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: "0.62rem",
                background: "var(--surface2)",
                color: "var(--muted)",
                padding: "2px 7px",
                borderRadius: "5px",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                fontFamily: "'JetBrains Mono', monospace",
              }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}