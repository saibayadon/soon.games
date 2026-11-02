import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";
import {
  Consoles,
  Types,
  CONSOLES,
  TYPES,
  isConsole,
  isType,
} from "~/data/constants";
import { fetchGamesIGDB } from "~/lib/igdb/client";
import { GameListItem } from "./components/GameListItem";
import { GamesSkeleton } from "./components/GamesSkeleton";
import { dateToRelative } from "~/lib/utils/date";

type PageParams = Promise<{ console: string; type: string }>;

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

export async function generateMetadata(props: {
  params: PageParams;
}): Promise<Metadata> {
  const { console: selectedConsole, type: selectedType } = await props.params;
  if (!isConsole(selectedConsole) || !isType(selectedType)) return {};

  return { title: `${TYPES[selectedType]} · ${CONSOLES[selectedConsole]}` };
}

async function GamesList({
  selectedConsole,
  selectedType,
}: {
  selectedConsole: Consoles;
  selectedType: Types;
}) {
  "use cache";

  cacheLife("games");
  cacheTag(`games-${selectedConsole}-${selectedType}`);

  const games = await fetchGamesIGDB(selectedConsole, selectedType);

  if (games.length === 0) {
    return (
      <p className="space-y-2 text-sm font-bold">
        i&apos;m sorry mario, but your results are in another castle.
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

export default async function ListPage(props: { params: PageParams }) {
  const { console: selectedConsole, type: selectedType } = await props.params;

  // Layouts don't re-run on every navigation, so validate here too.
  if (!isConsole(selectedConsole) || !isType(selectedType)) {
    notFound();
  }

  return (
    <Suspense fallback={<GamesSkeleton />}>
      <GamesList
        selectedConsole={selectedConsole}
        selectedType={selectedType}
      />
    </Suspense>
  );
}
