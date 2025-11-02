import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";
import { Consoles, Types } from "~/data/constants";
import { fetchGames, GameData } from "./actions";
import { GameListItem } from "./components/GameListItem";
import { dateToRelative } from "~/lib/utils/date";
import Loading from "./loading";

export default async function ListPage(props: {
  params: Promise<{
    console: string;
    type: string;
  }>;
}) {
  const params = await props.params;
  const selectedConsole = params.console as Consoles;
  const selectedType = params.type as Types;

  return (
    <Suspense fallback={<Loading />}>
      <GamesList
        selectedConsole={selectedConsole}
        selectedType={selectedType}
      />
    </Suspense>
  );
}

async function GamesList({
  selectedConsole,
  selectedType,
}: {
  selectedConsole: Consoles;
  selectedType: Types;
}) {
  "use cache";
  cacheTag(`list-${selectedConsole}-${selectedType}`);
  cacheLife("hours");

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
