/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import("next").NextConfig} */
const config = {
  cacheComponents: true,
  experimental: {
    staleTimes: {
      dynamic: 3600, // Cache dynamic pages for 1 hour (3600 seconds)
      static: 3600, // Cache static pages for 1 hour (3600 seconds)
    },
  },
  turbopack: {
    resolveAlias: {
      "~": "./src",
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

export default config;
