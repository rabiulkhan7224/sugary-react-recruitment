import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1wh1xji6f82aw.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sugarytestapi.azurewebsites.net",    
        port: "",     
        pathname: "/**",

      },
    ],
  },
};

export default nextConfig;
