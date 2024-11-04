"use server";

import { cookies } from "next/headers";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { CONSOLES, CONSOLE_ID, Consoles, Types } from "~/data/constants";

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

// Set a cookie whenever a console or a type is clicked. This will be used to persist the selection for future visits.
export const setCookies = async (c: Consoles, t: Types) => {
  (await cookies()).set("selectedConsole", c);
  (await cookies()).set("selectedType", t);
};

// Fetches the API Token for IGDB
const fetchIGDBToken = async () => {
  const URL = `https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT}&client_secret=${process.env.IGDB_SECRET}&grant_type=client_credentials`;
  const { access_token } = await fetch(URL, { method: "POST" }).then((res) =>
    res.json(),
  );
  return access_token;
};

// Generates the request query
const generateQuery = (c: Consoles, t: Types): string => {
  const release_date = `& first_release_date ${
    t === "new" ? "<" : ">"
  } ${Math.floor(Date.now() / 1000)}`;

  const sort = t === "coming_soon" ? "asc" : "desc";

  const platform = CONSOLE_ID[CONSOLES[c]] || CONSOLE_ID["switch"];
  return `fields *, cover.url, release_dates.date, videos.video_id, websites.url; where platforms = [${platform}] ${release_date}; sort first_release_date ${sort}; limit 200;`;
};

// Fetches the list of games for a given console and type.
export const fetchGamesIGDB = async (
  c: Consoles,
  t: Types,
): Promise<GameData[]> => {
  "use cache";
  cacheLife("hours");

  try {
    const token = await fetchIGDBToken();

    const GAMES_URL = `https://api.igdb.com/v4/games`;

    const headers = {
      "Client-ID": process.env.IGDB_CLIENT || "",
      Authorization: `Bearer ${token}`,
    };

    const games = await fetch(GAMES_URL, {
      body: generateQuery(c, t),
      headers,
      method: "POST",
    }).then((res) => res.json());

    if (games.length >= 0) return games;

    return [];
  } catch (e) {
    return [];
  }
};
