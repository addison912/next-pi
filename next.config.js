/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "az620379.vo.msecnd.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn1.predictit.org",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "placecats.com",
        pathname: "**",
      },
    ],
  },
};

export default config;
