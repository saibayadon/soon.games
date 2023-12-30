import Link from "next/link";
import { CONSOLES, Consoles, TYPES, Types } from "~/data/constants";
import { fetchGames } from "./actions";

export default async function ListPage({
  params,
}: {
  params: {
    console: Consoles;
    type: Types;
  };
}) {
  const selectedConsole = params.console;
  const selectedType = params.type;

  const games = await fetchGames(selectedConsole, selectedType);

  if (games.length === 0) {
    return (
      <p className="text-sm font-bold">
        Ooops... we couldn't find any games. Please come back later.
      </p>
    );
  }

  return (
    <ul className="space-y-2 text-sm font-bold">
      {games.map((game) => {
        return (
          <li key={game.id}>
            {game.title}
            <span className="mx-2 text-[--selected-color]">
              <Link
                className="mr-2 hover:underline"
                rel="external"
                target="_blank"
                href={game.link}
              >
                info
              </Link>
              /
              <Link
                className="ml-2 hover:underline"
                rel="external"
                target="_blank"
                href={`https://www.youtube.com/results?search_query=${game.title} ${selectedConsole} trailer`}
              >
                youtube
              </Link>
            </span>
            <span className="inline-block rounded bg-[--selected-color] px-3 py-1 text-xs text-white">
              {game.date}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export const revalidate = 60 * 60 * 12; // Revalidate once per day.
export const dynamicParams = false; // Don't care for other paths.

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
