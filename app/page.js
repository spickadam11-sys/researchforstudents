export default function Home() {
  return (
    <main style={{
      minHeight: "calc(100vh - 58px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "2rem",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(3.5rem, 10vw, 7rem)",
          lineHeight: 0.95,
          letterSpacing: "-3px",
          marginBottom: "1.5rem",
        }}>
          <span style={{ color: "var(--text)", display: "block" }}>GAME</span>
          <span style={{ color: "var(--accent)", display: "block", textShadow: "0 0 40px rgba(0,229,255,0.4)" }}>HUB</span>
        </h1>

        <p style={{
          color: "var(--muted)",
          fontSize: "1rem",
          marginBottom: "2.5rem",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          unblocked · unrestricted · always on
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/games" style={{
            textDecoration: "none",
            background: "var(--accent)",
            color: "#000",
            padding: "12px 28px",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "0.95rem",
          }}>Browse Games</a>
          <a href="/proxy" style={{
            textDecoration: "none",
            background: "transparent",
            color: "var(--text)",
            padding: "12px 28px",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "0.95rem",
            border: "1px solid var(--border)",
          }}>Open Proxy</a>
        </div>
      </div>
    </main>
  );
}