import { cacheLife, cacheTag } from "next/cache";
import { Consoles, Types } from "~/data/constants";
import { fetchGamesIGDB, GameData } from "~/lib/igdb/client";

export type { GameData };

/**
 * Server-side data helper for fetching games from IGDB with caching
 */
export const fetchGames = async (
  c: Consoles,
  t: Types,
  currentTime: number = Math.floor(Date.now() / 1000),
): Promise<GameData[]> => {
  "use cache";
  cacheLife("hours");
  cacheTag(`igdb-${c}-${t}`);
  return fetchGamesIGDB(c, t, currentTime);
};
