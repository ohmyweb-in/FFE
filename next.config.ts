import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML/CSS/JS in `out/` for Netlify (publish directory: out).
  output: "export",
  // `/about/index.html` so Netlify serves each route without extra rewrites.
  trailingSlash: true,
  // Dev only: let phones on the office Wi-Fi load the dev server (http://192.168.x.x:3000).
  allowedDevOrigins: ["192.168.*.*"],
  images: {
    // The default optimizer needs a server; static export serves the source files.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    // Next 16 requires an explicit allowlist; 75 = default, 90 = hero photography.
    qualities: [75, 90],
  },
};

export default nextConfig;
