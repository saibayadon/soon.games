import { cacheLife, cacheTag } from "next/cache";
import { Consoles, Types, CONSOLES, TYPES } from "~/data/constants";
import { fetchGames } from "./actions";
import { GameListItem } from "./components/GameListItem";
import { dateToRelative } from "~/lib/utils/date";

// Generate static params for all console/type combinations
// This tells Next.js to prerender these routes at build time
export function generateStaticParams() {
  const consoles = Object.keys(CONSOLES) as Consoles[];
  const types = Object.keys(TYPES) as Types[];

  return consoles.flatMap((console) =>
    types.map((type) => ({
      console,
      type,
    })),
  );
}

export default async function ListPage(props: {
  params: Promise<{
    console: string;
    type: string;
  }>;
}) {
  "use cache";

  const params = await props.params;
  const selectedConsole = params.console as Consoles;
  const selectedType = params.type as Types;

  cacheLife("hours");
  cacheTag(`list-${selectedConsole}-${selectedType}`);

  const games = await fetchGames(selectedConsole, selectedType);

  if (games.length === 0) {
    return (
      <p className="space-y-2 text-sm font-bold">
        i'm sorry mario, but your results are in another castle.
      </p>
    );
  }

  return (
    <ul className="space-y-2 text-sm font-bold">
      {games.map((game) => (
        <GameListItem
          key={game.id}
          game={game}
          relativeDate={dateToRelative(game.first_release_date)}
        />
      ))}
    </ul>
  );
}
