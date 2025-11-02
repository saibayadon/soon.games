"use server";

import { cacheLife, cacheTag } from "next/cache";
import { Consoles, Types } from "~/data/constants";
import { fetchGamesIGDB, GameData } from "~/lib/igdb/client";

export type { GameData };

/**
 * Server action for fetching games from IGDB with caching
 * This provides an additional caching layer on top of fetch-level caching
 */
export const fetchGames = async (
  c: Consoles,
  t: Types,
): Promise<GameData[]> => {
  "use cache";
  cacheLife("hours");
  cacheTag(`igdb-${c}-${t}`);
  return fetchGamesIGDB(c, t);
};
