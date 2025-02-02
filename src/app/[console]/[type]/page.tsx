"use cache";
import { unstable_cacheLife as cacheLife } from "next/cache";
import Link from "next/link";
import { CONSOLES, Consoles, TYPES, Types } from "~/data/constants";
import { GameData, fetchGamesIGDB } from "./actions";

const getVideoLinks = (game: GameData) => {
  return game.videos?.map((video, index: number) => {
    return (
      <Link
        className="mr-2 hover:underline"
        rel="external"
        target="_blank"
        href={`https://youtu.be/${video.video_id}`}
        key={video.video_id}
      >
        video {index}
      </Link>
    );
  });
};

const dateToRelative = (date?: number): string => {
  if (date === undefined) return "";
  const now = Math.floor(Date.now() / 1000);
  const diff = date - now;
  const days = Math.floor(diff / (60 * 60 * 24));

  if (Math.abs(days) < 1) {
    const hours = Math.floor(Math.abs(diff) / (60 * 60));
    if (hours === 0) return "today";

    if (diff > 0) {
      return `in ${hours} hour${hours !== 1 ? "s" : ""}`;
    } else {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }
  }

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  return rtf.format(days, "day");
};

export default async function ListPage(props: {
  params: Promise<{
    console: Consoles;
    type: Types;
  }>;
}) {
  cacheLife("hours");
  const params = await props.params;
  const selectedConsole = params.console;
  const selectedType = params.type;

  const games = await fetchGamesIGDB(selectedConsole, selectedType);

  if (games.length === 0) {
    return (
      <p className="space-y-2 text-sm font-bold">
        i'm sorry mario, but your results are in another castle.
      </p>
    );
  }

  return (
    <ul className="space-y-2 text-sm font-bold">
      {games.map((game) => {
        return (
          <li key={game.id}>
            {game.name}
            <span className="peer relative mx-2 text-(--selected-color)">
              <Link
                className="hover:underline"
                rel="external"
                target="_blank"
                href={game.url || "#"}
              >
                info
              </Link>
            </span>
            <span className="text-(--selected-color)">
              {game.videos ? "/ " : ""}
              {getVideoLinks(game)}
            </span>
            {game.cover ? (
              <img
                className="absolute opacity-0 transition-opacity delay-100 peer-hover:opacity-100"
                src={game.cover?.url}
                alt={game.name}
              />
            ) : null}
            <span className="inline-block rounded-sm bg-(--selected-color) px-3 py-1 text-xs text-white">
              {dateToRelative(game.first_release_date)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

// Generate params from constants.
export async function generateStaticParams() {
  const params: Array<{ console: string; type: string }> = [];

  Object.keys(CONSOLES).forEach((console) => {
    Object.keys(TYPES).forEach((type) => {
      params.push({
        console,
        type,
      });
    });
  });

  return params;
}
