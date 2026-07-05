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
  cacheLife: {
    games: {
      stale: 5 * 60, // 5 minutes
      revalidate: 60 * 60, // 1 hour
    },
  },
  experimental: {
    staleTimes: {
      dynamic: 5 * 60,
      static: 5 * 60,
    },
  },
  turbopack: {
    root: __dirname,
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
