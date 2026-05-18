"use client";
import { useState, useMemo } from "react";

const PROXY_BASE = "https://incognito-production-7ded.up.railway.app";
const UV_PREFIX  = "/~/uv/";

// Matches the encodeUrl function in uv.config.js
function uvEncode(str) {
  return str.toString().split('').map((char, ind) =>
    ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 3) : char
  ).join('');
}

function openViaProxy(rawInput, title) {
  let url = typeof rawInput === "string" ? rawInput.trim() : rawInput;
  if (!url) return;
  if (!url.includes(".") || url.includes(" ")) {
    url = "https://duckduckgo.com/?q=" + encodeURIComponent(url);
  } else if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }
  window.open(
    "https://incognito-production-7ded.up.railway.app/?link=" + uvEncode(url),
    "_blank"
  );
}

const GAMES = [
  { id:"1v1lol",          name:"1v1.LOL",                image:"/Thumbnails/1v1_lol.png",                 url:"https://1v1-lol-online.github.io/",                                                                                   tags:["shooting","building","multiplayer"] },
  { id:"2048",            name:"2048",                    image:"/Thumbnails/2048.png",                    url:"https://play2048.co/",                                                                                                tags:["puzzle","casual"] },
  { id:"amongus",         name:"Among Us",                image:"/Thumbnails/among_us.png",                url:"https://www.amongus.onl/",                                                                                            tags:["multiplayer","social"] },
  { id:"basketbros",      name:"Basket Bros",             image:"/Thumbnails/basket_bros.png",             url:"https://basketbros.io/",                                                                                              tags:["sports","2-player"] },
  { id:"basketrandom",    name:"Basket Random",           image:"/Thumbnails/basket_random.png",           url:"https://files.twoplayergames.org/files/games/other/Basket_Random/index.html",                                        tags:["sports","random","2-player"] },
  { id:"bblegends",       name:"Basketball Legends 2020", image:"/Thumbnails/basketball_legends_2020.png", url:"https://mathgames66.github.io/p/bblegends2020.html",                                                                 tags:["sports","basketball"] },
  { id:"bballstars",      name:"Basketball Stars",        image:"/Thumbnails/basketball_stars.png",        url:"https://basketballstars-online.github.io/",                                                                          tags:["sports","basketball","multiplayer"] },
  { id:"bigshotboxing",   name:"Big Shot Boxing",         image:"/Thumbnails/big_shot_boxing.png",         url:"https://bigshot-boxing.github.io/",                                                                                  tags:["boxing","sports"] },
  { id:"bloons",          name:"Bloons Tower Defense",    image:"/Thumbnails/bloons.png",                  url:"https://bloonstd.github.io/",                                                                                        tags:["strategy","tower-defense"] },
  { id:"bloons2",         name:"Bloons TD 2",             image:"/Thumbnails/bloons2.png",                 url:"https://bloonstd2.github.io/",                                                                                       tags:["strategy","tower-defense"] },
  { id:"bmx",             name:"BMX Space",               image:"/Thumbnails/bmx.png",                     url:"https://1v1-lol-online.github.io/",                                                                                   tags:["sports","skill"] },
  { id:"boxel",           name:"Boxel Rebound",           image:"/Thumbnails/boxel_rebound.png",           url:"https://boxelrebound.io/",                                                                                           tags:["platformer","skill"] },
  { id:"chrome",          name:"Chrome Dino",             image:"/Thumbnails/chrome_dino.png",             url:"https://chromedino.com/",                                                                                             tags:["arcade","casual","endless"] },
  { id:"clicker",         name:"Cookie Clicker",          image:"/Thumbnails/cookie_clicker.png",          url:"https://orteil.dashnet.org/cookieclicker/",                                                                          tags:["idle","casual"] },
  { id:"crossyroad",      name:"Crossy Road",             image:"/Thumbnails/crossy_road.png",             url:"https://poki.com/en/g/crossy-road",                                                                                  tags:["arcade","casual"] },
  { id:"cybertanks",      name:"Cyber Tanks",             image:"/Thumbnails/cyber_tanks.png",             url:"https://poki.com/en/g/cyber-tanks",                                                                                  tags:["shooting","strategy"] },
  { id:"dadlish",         name:"Dadlish",                 image:"/Thumbnails/dadlish.png",                 url:"https://poki.com/en/g/dadlish",                                                                                      tags:["platformer","casual"] },
  { id:"doodlejump",      name:"Doodle Jump",             image:"/Thumbnails/doodle_jump.png",             url:"https://doodlejump.io/",                                                                                             tags:["arcade","endless"] },
  { id:"ducklife",        name:"Duck Life",               image:"/Thumbnails/duck_life.png",               url:"https://ducklife.app/",                                                                                              tags:["rpg","casual"] },
  { id:"eaglence",        name:"Eaglence",                image:"/Thumbnails/eaglence.png",                url:"https://eaglence.io/",                                                                                               tags:["shooting","multiplayer"] },
  { id:"emulatorjs",      name:"EmulatorJS",              image:"/Thumbnails/emulatorjs.png",              url:"https://emulatorjs.org/",                                                                                            tags:["emulator","retro"] },
  { id:"flashtetris",     name:"Flash Tetris",            image:"/Thumbnails/flash_tetris.png",            url:"https://freetetris.org/",                                                                                            tags:["puzzle","classic"] },
  { id:"frogger",         name:"Frogger",                 image:"/Thumbnails/frogger.png",                 url:"https://www.miniclip.com/games/frogger/en/",                                                                         tags:["arcade","classic"] },
  { id:"fruitninja",      name:"Fruit Ninja",             image:"/Thumbnails/fruit_ninja.png",             url:"https://fruitninja.io/",                                                                                             tags:["arcade","casual"] },
  { id:"geometrydash",    name:"Geometry Dash",           image:"/Thumbnails/geometry_dash.png",           url:"https://geometrydash.io/",                                                                                           tags:["platformer","skill","music"] },
  { id:"gm2",             name:"GM2",                     image:"/Thumbnails/gm2.png",                     url:"https://gm2.io/",                                                                                                    tags:["casual"] },
  { id:"gpacman",         name:"Google Pacman",           image:"/Thumbnails/google_pacman.png",           url:"https://www.google.com/logos/2010/pacman10-i.html",                                                                  tags:["arcade","classic"] },
  { id:"hardestgame",     name:"World's Hardest Game",    image:"/Thumbnails/hardest_game.png",            url:"https://worldshardestgame.org/",                                                                                     tags:["skill","hard"] },
  { id:"happywheels",     name:"Happy Wheels",            image:"/Thumbnails/happy_wheels.png",            url:"https://www.totaljerkface.com/happy_wheels.tjf",                                                                     tags:["physics","casual"] },
  { id:"hotshothoops",    name:"Hotshot Hoops",           image:"/Thumbnails/hotshot_hoops.png",           url:"https://poki.com/en/g/hotshot-hoops",                                                                                tags:["sports","basketball"] },
  { id:"minesweeper",     name:"Minesweeper",             image:"/Thumbnails/minesweeper.png",             url:"https://minesweeper.online/",                                                                                        tags:["puzzle","classic"] },
  { id:"minecraft",       name:"Minecraft Classic",       image:"/Thumbnails/minecraft.png",               url:"https://classic.minecraft.net/",                                                                                     tags:["sandbox","building","multiplayer"] },
  { id:"monkeymart",      name:"Monkey Mart",             image:"/Thumbnails/monkey_mart.png",             url:"https://monkey-mart.io/",                                                                                            tags:["idle","casual"] },
  { id:"pacman",          name:"Pac-Man",                 image:"/Thumbnails/pacman.png",                  url:"https://freepacman.org/",                                                                                            tags:["arcade","classic"] },
  { id:"papersio2",       name:"Paper.io 2",              image:"/Thumbnails/paper_io2.png",               url:"https://paper-io.com/",                                                                                              tags:["io","strategy","multiplayer"] },
  { id:"retrobowl",       name:"Retro Bowl",              image:"/Thumbnails/retro_bowl.png",              url:"https://retrobowl.me/",                                                                                              tags:["sports","football"] },
  { id:"riddleschool",    name:"Riddle School",           image:"/Thumbnails/riddle_school.png",           url:"https://www.coolmathgames.com/0-riddle-school",                                                                      tags:["puzzle","adventure"] },
  { id:"run",             name:"Run",                     image:"/Thumbnails/run.png",                     url:"https://www.twoplayergames.org/embed/run-3d",                                                                        tags:["platformer","endless"] },
  { id:"slope",           name:"Slope",                   image:"/Thumbnails/slope.png",                   url:"https://slope-game.github.io/",                                                                                      tags:["arcade","skill","endless"] },
  { id:"slowroads",       name:"Slow Roads",              image:"/Thumbnails/slow_roads.png",              url:"https://slowroads.io/",                                                                                               tags:["driving","relaxing"] },
  { id:"snowrider",       name:"Snow Rider 3D",           image:"/Thumbnails/snow_rider_3d.png",           url:"https://snow-rider3d.github.io/",                                                                                    tags:["racing","winter"] },
  { id:"soccerbros",      name:"Soccer Bros",             image:"/Thumbnails/soccer_bros.png",             url:"https://soccerbros.io/",                                                                                              tags:["sports","soccer","2-player"] },
  { id:"soccerbros2",     name:"Soccer Bros 2",           image:"/Thumbnails/soccer_bros_2.png",           url:"https://soccer-bros.net/game/soccer-bros-2/",                                                                        tags:["sports","soccer","2-player"] },
  { id:"soccerrandom",    name:"Soccer Random",           image:"/Thumbnails/soccer_random.png",           url:"https://files.twoplayergames.org/files/games/other/Soccer_Random/index.html",                                        tags:["sports","soccer","random"] },
  { id:"spacewaves",      name:"Spacewaves",              image:"/Thumbnails/spacewaves.png",              url:"https://spacewaves.io/",                                                                                              tags:["arcade","skill"] },
  { id:"tag",             name:"Tag",                     image:"/Thumbnails/tag.png",                     url:"https://taggame.io/",                                                                                                 tags:["casual","multiplayer"] },
  { id:"tetris",          name:"Tetris",                  image:"/Thumbnails/tetris.png",                  url:"https://www.freetetris.org/",                                                                                        tags:["puzzle","classic"] },
  { id:"texasholdem",     name:"Texas Hold'em",           image:"/Thumbnails/texas_holdem.png",            url:"https://games.aarp.org/games/texas-holdem-poker-sit-and-go",                                                         tags:["card","casino"] },
  { id:"impossiblequiz",  name:"The Impossible Quiz",     image:"/Thumbnails/the_impossible_quiz.png",     url:"https://the-impossible-quiz.co.uk/",                                                                                  tags:["quiz","casual","hard"] },
  { id:"tictactoe",       name:"Tic Tac Toe",             image:"/Thumbnails/tic_tac_toe.png",             url:"https://playtictactoe.org/",                                                                                          tags:["board","2-player","classic"] },
  { id:"tinyfishing",     name:"Tiny Fishing",            image:"/Thumbnails/tiny_fishing.png",            url:"https://mathgames66.github.io/p/tinyfishing.html",                                                                   tags:["idle","casual"] },
  { id:"tubejumpers",     name:"Tube Jumpers",            image:"/Thumbnails/tube_jumpers.png",            url:"https://topvaz.com/go/tube-jumpers/",                                                                                tags:["casual","multiplayer"] },
];

const ALL_TAGS = ["all", ...Array.from(new Set(GAMES.flatMap(g => g.tags))).sort()];

export default function GamesPage() {
  const [search, setSearch]       = useState("");
  const [activeTag, setActiveTag] = useState("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return GAMES.filter(g => {
      const matchTag    = activeTag === "all" || g.tags.includes(activeTag);
      const matchSearch = !q || g.name.toLowerCase().includes(q) || g.tags.some(t => t.includes(q));
      return matchTag && matchSearch;
    });
  }, [search, activeTag]);

  return (
    <main style={{ minHeight: "calc(100vh - 58px)", padding: "2rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: "4px" }}>Games</h1>
        <p style={{ color: "var(--muted)", fontSize: "0.85rem", fontFamily: "'JetBrains Mono', monospace" }}>
          {GAMES.length} games — click to play
        </p>
      </div>

      <div style={{ position: "relative", maxWidth: "380px", marginBottom: "1.25rem" }}>
        <input type="text" placeholder="Search games or tags..."
          value={search} onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "10px 14px",
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "10px", color: "var(--text)", fontSize: "0.9rem",
            outline: "none", fontFamily: "'Syne', sans-serif",
          }}
          onFocus={e => (e.target.style.borderColor = "var(--accent)")}
          onBlur={e  => (e.target.style.borderColor = "var(--border)")}
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "2rem" }}>
        {ALL_TAGS.map(tag => (
          <button key={tag} onClick={() => setActiveTag(tag)} style={{
            padding: "4px 12px", borderRadius: "6px",
            border: activeTag === tag ? "1px solid var(--accent)" : "1px solid var(--border)",
            background: activeTag === tag ? "rgba(0,229,255,0.12)" : "var(--surface)",
            color: activeTag === tag ? "var(--accent)" : "var(--muted)",
            fontSize: "0.68rem", fontFamily: "'JetBrains Mono', monospace",
            textTransform: "uppercase", letterSpacing: "0.6px",
            cursor: "pointer", transition: "all 0.15s",
          }}>{tag}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.1rem" }}>
        {filtered.map(game => <GameCard key={game.id} game={game} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "5rem", color: "var(--muted)" }}>
          No games match "{search}"
        </div>
      )}
    </main>
  );
}

function GameCard({ game }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{
      background: "var(--surface)",
      border: `1px solid ${hover ? "var(--accent)" : "var(--border)"}`,
      borderRadius: "var(--card-radius)", overflow: "hidden",
      transition: "all 0.18s",
      transform: hover ? "translateY(-3px)" : "translateY(0)",
      boxShadow: hover ? "0 8px 30px rgba(0,229,255,0.12)" : "none",
      cursor: "pointer",
    }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      <div style={{ position: "relative", aspectRatio: "16/10", background: "var(--surface2)", overflow: "hidden" }}>
        <img src={game.image} alt={game.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hover ? "scale(1.05)" : "scale(1)", transition: "transform 0.3s" }}
          onError={e => { e.target.style.display = "none"; }}
        />
        <div style={{
          position: "absolute", inset: 0, background: "rgba(7,8,15,0.85)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "8px", opacity: hover ? 1 : 0, transition: "opacity 0.2s",
        }}>
          <button onClick={e => { e.stopPropagation(); openViaProxy(game.url, game.name); }}
            style={{ background: "var(--accent)", color: "#000", border: "none", borderRadius: "8px", padding: "8px 20px", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", width: "140px" }}>
            ▶ Play Here
          </button>
          <button onClick={e => { e.stopPropagation(); openViaProxy(game.url, game.name); }}
            style={{ background: "transparent", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px", padding: "7px 20px", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", width: "140px" }}>
            ↗ New Tab
          </button>
        </div>
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: "6px" }}>{game.name}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {game.tags.map(tag => (
            <span key={tag} style={{ fontSize: "0.62rem", background: "var(--surface2)", color: "var(--muted)", padding: "2px 7px", borderRadius: "5px", textTransform: "uppercase", letterSpacing: "0.6px", fontFamily: "'JetBrains Mono', monospace" }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}