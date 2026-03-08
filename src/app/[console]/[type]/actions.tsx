"use server";

import { cacheLife, cacheTag } from "next/cache";
import { Consoles, Types } from "~/data/constants";
import { fetchGamesIGDB } from "~/lib/igdb/client";
import type { GameData } from "~/lib/igdb/client";

const SIX_HOURS_IN_SECONDS = 6 * 60 * 60;

/**
 * Server action for fetching games from IGDB with caching
 * This provides a 6-hour cache window for each console/type pair
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
