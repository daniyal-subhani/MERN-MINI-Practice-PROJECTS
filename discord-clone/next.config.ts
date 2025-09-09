import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* config options here */
  images: {
  domains: [
    "ufs.sh",
    "utfs.io",
    "uploadthing.com",
    "1mg81siprb.ufs.sh", // the exact subdomain your file is on
    "hj0xtfba98.ufs.sh"  // add any other specific subdomains you use
  ]
}
};

export default nextConfig;
