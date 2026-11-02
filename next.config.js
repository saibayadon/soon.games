/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  cacheComponents: true,
  // Default <Link>s prefetch a shared App Shell per route; the nav links opt in
  // to `prefetch={true}` to also resolve the cached, URL-specific games list.
  partialPrefetching: true,
  // A stray package-lock.json in ~ makes Next guess the wrong workspace root.
  turbopack: {
    root: import.meta.dirname,
  },
  cacheLife: {
    games: {
      stale: 5 * 60, // 5 minutes
      revalidate: 60 * 60, // 1 hour
    },
  },
};

export default config;
