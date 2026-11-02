"use client";

import { useSyncExternalStore } from "react";

const WIDTHS = ["w-20", "w-52", "w-32", "w-28", "w-40"];

const subscribe = () => () => {};

/**
 * Renders nothing during SSR/hydration (the cached list streams in right
 * behind the shell, so the skeleton would only flash); shows immediately on
 * client navigations.
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
