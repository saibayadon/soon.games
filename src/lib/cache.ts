export const ONE_DAY_IN_SECONDS = 24 * 60 * 60;

export const ONE_DAY_CACHE_LIFE = {
  stale: ONE_DAY_IN_SECONDS,
  revalidate: ONE_DAY_IN_SECONDS,
  expire: ONE_DAY_IN_SECONDS + 5 * 60,
};
