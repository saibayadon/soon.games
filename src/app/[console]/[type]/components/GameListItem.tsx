import Link from "next/link";
import { GameData } from "~/lib/igdb/client";
import { VideoLinks } from "./VideoLinks";

interface GameListItemProps {
  game: GameData;
  relativeDate: string;
}

/**
 * Renders a single game list item with cover image, info link, videos, and release date
 */
export function GameListItem({ game, relativeDate }: GameListItemProps) {
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
        <VideoLinks videos={game.videos} />
      </span>
      {game.cover ? (
        <img
          className="absolute opacity-0 transition-opacity delay-100 peer-hover:opacity-100"
          src={game.cover?.url}
          alt={game.name}
        />
      ) : null}
      <span className="inline-block rounded-sm bg-(--selected-color) px-3 py-1 text-xs text-white">
        {relativeDate}
      </span>
    </li>
  );
}
