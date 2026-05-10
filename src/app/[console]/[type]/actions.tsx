import { cacheLife, cacheTag } from "next/cache";
import { Consoles, Types } from "~/data/constants";
import { ONE_DAY_CACHE_LIFE } from "~/lib/cache";
import { fetchGamesIGDB } from "~/lib/igdb/client";
import type { GameData } from "~/lib/igdb/client";

/**
 * Server-side data helper for fetching games from IGDB with caching
 */
export const fetchGames = async (
  c: Consoles,
  t: Types,
): Promise<GameData[]> => {
  "use cache";

  cacheLife(ONE_DAY_CACHE_LIFE);
  cacheTag(`igdb-${c}-${t}`);

  return fetchGamesIGDB(c, t);
};
