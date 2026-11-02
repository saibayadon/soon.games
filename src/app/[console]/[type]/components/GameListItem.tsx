import type { GameData } from "~/lib/igdb/client";
import { RelativeDate } from "./RelativeDate";
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
    <li>
      {game.name}
      <span className="peer relative mx-2 text-(--selected-color)">
        <a
          className="hover:underline"
          rel="external noopener noreferrer"
          target="_blank"
          href={game.url || "#"}
        >
          info
        </a>
      </span>
      <span className="text-(--selected-color)">
        {game.videos ? "/ " : ""}
        <VideoLinks videos={game.videos} />
      </span>
      {game.cover ? (
        // hidden + lazy: the image isn't fetched until the row is hovered
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="absolute hidden transition-opacity delay-100 peer-hover:block starting:peer-hover:opacity-0"
          src={game.cover.url}
          alt={game.name}
          loading="lazy"
          decoding="async"
        />
      ) : null}
      <span className="inline-block rounded-sm bg-(--selected-color) px-3 py-1 text-xs text-white">
        <RelativeDate
          timestamp={game.first_release_date}
          initialLabel={relativeDate}
        />
      </span>
    </li>
  );
}
