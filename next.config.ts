import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow opening the dev server from a phone on the same Wi-Fi (e.g. 192.168.0.171:3000).
  // Without this, Next blocks its dev scripts from non-localhost hosts, React never
  // hydrates, and every fade-in section stays at opacity 0.
  allowedDevOrigins: ["192.168.0.171", "192.168.*.*"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "humsapphire.com" },
      { protocol: "https", hostname: "*.unsplash.com" },
    ],
  },
};

export default nextConfig;