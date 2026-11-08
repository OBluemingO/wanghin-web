import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Mock: doctor portraits from the clinic's current site until the clinic sends new photos.
  images: { remotePatterns: [new URL("https://www.dentalcareatwanghin.com/images/ready-template/**")] },
};

export default nextConfig;
