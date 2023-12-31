"use server";

import crypto from "crypto";
import * as cheerio from "cheerio";
import { cookies } from "next/headers";
import { Consoles, TYPES, Types } from "~/data/constants";

type GameData = {
  id: string;
  title: string;
  date: string;
  link: string;
};

// Set a cookie whenever a console or a type is clicked. This will be used to persist the selection for future visits.
export const setCookies = async (c: Consoles, t: Types) => {
  cookies().set("selectedConsole", c);
  cookies().set("selectedType", t);
};

// Fetch data from metacritic
export const fetchGames = async (
  c: Consoles,
  t: Types,
): Promise<GameData[]> => {
  function getRelativeTime(timestamp: number) {
    const rtf = new Intl.RelativeTimeFormat("en", {
      numeric: "auto",
    });
    const daysDifference = Math.round(
      (timestamp - new Date().getTime()) / (1000 * 60 * 60 * 24),
    );
    return rtf.format(daysDifference, "day");
  }

  const parseResponse = async (response: Response): Promise<GameData[]> => {
    if (response.status !== 200) return [];
    const data = await response.text();
    const $ = cheerio.load(data);

    let titles = $(".c-productListings_grid .c-finderProductCard").map(
      (i, el) => {
        // Title
        const title = $(el).find("h3").text().trim();

        // Date
        const date_str =
          $(el).find(".c-finderProductCard_meta").text().split("\n")[1] || "";
        const date = getRelativeTime(new Date(date_str).getTime());

        // Game URL
        const link = `https://www.metacritic.com${$(el)
          .find("a.c-finderProductCard_container")
          .attr("href")}`;

        const hash = crypto.createHash("md5").update(title).digest("hex");
        return { id: hash, title, date, link };
      },
    );

    return titles.get();
  };

  async function fetchData(page = 1): Promise<GameData[]> {
    let METACRITIC_URL = `https://www.metacritic.com/browse/game/${c}/all/all-time/new/?platform=${c}&page=${page}`;
    if (TYPES[t] === TYPES.coming_soon)
      METACRITIC_URL = `https://www.metacritic.com/browse/game/${c}/all/all-time/new/?platform=${c}&releaseType=coming-soon&page=${page}`;
    const response = await fetch(METACRITIC_URL, {
      next: { revalidate: 60 * 60 * 6 }, // Revalidate after 6 hours.
    });
    const data = await parseResponse(response);
    if (page === 1 && data.length === 0) return []; // Bail if first page is empty. Metacritic is down?
    if (page === 5) return data; // Return games after 5 pages.
    return data.concat(await fetchData(page + 1)); // Recursive fetch.
  }

  try {
    const games = await fetchData();
    // Filter duplicates
    return [...new Map(games.map((game) => [game.id, game])).values()];
  } catch (e) {
    console.log(e);
    return [];
  }
};
