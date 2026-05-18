"use client";

export default function ProxyPage() {
  return (
    <div style={{
      position: "fixed",
      top: "58px",
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      height: "calc(100vh - 58px)",
    }}>
      <iframe
        src="https://incognito-production-7b03.up.railway.app/"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
        allow="fullscreen"
        title="Proxy"
      />
    </div>
  );
}