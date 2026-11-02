"use client";

import { useSyncExternalStore } from "react";

const WIDTHS = ["w-20", "w-52", "w-32", "w-28", "w-40"];

const subscribe = () => () => {};

/**
 * Placeholder rows shown while a games list is being rendered.
 *
 * It renders nothing during SSR and hydration: the cached list is streamed in
 * right behind the static shell, so showing the skeleton there would only
 * flash. On client-side navigations it mounts straight to the client snapshot,
 * so the skeleton appears immediately. (It's a client component so the 50 rows
 * stay out of the RSC payload of every route.)
 */
export function GamesSkeleton() {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!isClient) return null;

  return (
    <ul className="-my-1.5">
      {Array.from({ length: 50 }, (_, index) => (
        <li
          key={index}
          className="mt-2 flex animate-pulse items-center space-x-1"
        >
          <div
            className={`h-4 ${WIDTHS[index % WIDTHS.length]} rounded-sm bg-gray-200`}
          />
          <div className="h-4 w-12 rounded-sm bg-gray-200" />
          <div className="h-4 w-20 rounded-sm bg-gray-200" />
          <div className="h-4 w-20 rounded-sm bg-gray-200 py-3" />
        </li>
      ))}
    </ul>
  );
}
