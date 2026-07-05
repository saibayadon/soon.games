import { cacheLife, cacheTag } from "next/cache";
import { Consoles, Types, CONSOLES, CONSOLE_ID } from "~/data/constants";

export type GameData = {
  id: number;
  name: string;
  aggregated_rating: number;
  first_release_date?: number;
  cover?: { id: number; url: string };
  videos?: { id: number; video_id: string }[];
  url: string;
  websites?: { id: number; url: string }[];
};

/**
 * Fetches the API Token for IGDB from Twitch OAuth.
 * Cached for 1 hour via "use cache" to avoid repeated OAuth calls.
 */
export const fetchIGDBToken = async (): Promise<string> => {
  "use cache";
  cacheLife({
    stale: 5 * 60, // 5 minutes
    revalidate: 60 * 60, // 1 hour
  });
  cacheTag("igdb-token");

  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    body: new URLSearchParams({
      client_id: process.env.IGDB_CLIENT || "",
      client_secret: process.env.IGDB_SECRET || "",
      grant_type: "client_credentials",
    }),
    cache: "no-store",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch IGDB token: ${response.status} ${response.statusText}`,
    );
  }

  const { access_token } = await response.json();
  return access_token as string;
};

/**
 * Generates the IGDB query string based on console and type
 * @param c Console to query for
 * @param t Type of games (new or coming_soon)
 * @param currentTime Current Unix timestamp in seconds
 * @returns IGDB query string
 */
export const generateQuery = (
  c: Consoles,
  t: Types,
  currentTime: number,
): string => {
  const release_date = `& first_release_date ${
    t === "new" ? "<" : ">"
  } ${currentTime}`;

  const sort = t === "coming_soon" ? "asc" : "desc";

  const platform = CONSOLE_ID[CONSOLES[c]] || CONSOLE_ID["switch 2"];
  return `fields *, cover.url, release_dates.date, videos.video_id, websites.url; where platforms = [${platform}] ${release_date}; sort first_release_date ${sort}; limit 200;`;
};

/**
 * Fetches the list of games for a given console and type from IGDB API.
 * Throws on any upstream failure so that SWR preserves stale cached HTML.
 * @param c Console to fetch games for
 * @param t Type of games (new or coming_soon)
 * @param currentTime Optional current Unix timestamp in seconds. Defaults to Date.now()
 * @returns Array of game data
 */
export const fetchGamesIGDB = async (
  c: Consoles,
  t: Types,
  currentTime: number = Math.floor(Date.now() / 1000),
): Promise<GameData[]> => {
  const token = await fetchIGDBToken();

  const response = await fetch("https://api.igdb.com/v4/games", {
    body: generateQuery(c, t, currentTime),
    cache: "no-store",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT || "",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(
      `IGDB API error: ${response.status} ${response.statusText}`,
    );
  }

  const games = await response.json();
  return Array.isArray(games) ? (games as GameData[]) : [];
};
