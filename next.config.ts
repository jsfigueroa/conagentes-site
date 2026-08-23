import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // CON-216: the hotel home was promoted to the root, so /hoteles is now a
      // duplicate of /. EXACT match only — the 19 spokes (/hoteles/agente-ia,
      // /hoteles/pms, /hoteles/blog/…) keep their URLs and must NOT be caught.
      { source: "/hoteles", destination: "/", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
