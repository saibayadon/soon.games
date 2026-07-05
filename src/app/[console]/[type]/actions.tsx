import { Consoles, Types } from "~/data/constants";
import { fetchGamesIGDB } from "~/lib/igdb/client";
import type { GameData } from "~/lib/igdb/client";

/**
 * Fetches games from IGDB for the given console and type.
 * Caching is handled at the rendered component level ("use cache" in GamesList).
 */
export const fetchGames = async (
  c: Consoles,
  t: Types,
): Promise<GameData[]> => fetchGamesIGDB(c, t);
