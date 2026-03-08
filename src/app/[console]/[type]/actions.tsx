import { cacheLife, cacheTag } from "next/cache";
import { Consoles, Types } from "~/data/constants";
import { fetchGamesIGDB } from "~/lib/igdb/client";
import type { GameData } from "~/lib/igdb/client";

const SIX_HOURS_IN_SECONDS = 6 * 60 * 60;

/**
 * Server-side data helper for fetching games from IGDB with caching
 */
export const fetchGames = async (
  c: Consoles,
  t: Types,
): Promise<GameData[]> => {
  "use cache";

  cacheLife({
    stale: SIX_HOURS_IN_SECONDS,
    revalidate: SIX_HOURS_IN_SECONDS,
    expire: SIX_HOURS_IN_SECONDS + 60,
  });
  cacheTag(`igdb-${c}-${t}`);

  return fetchGamesIGDB(c, t);
};
