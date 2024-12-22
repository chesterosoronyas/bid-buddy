import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[{
      hostname:'pub-2a2677c8f20d45d49d89c940b2ab02ae.r2.dev',
      protocol:"https",
      port:""
    }]
  }
};

export default nextConfig;
