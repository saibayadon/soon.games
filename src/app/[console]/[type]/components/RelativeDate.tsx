"use client";

import { useSyncExternalStore } from "react";
import { dateToRelative } from "~/lib/utils/date";

// One shared ticker for every mounted <RelativeDate />, instead of a timer each.
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(listener: () => void) {
  listeners.add(listener);
  timer ??= setInterval(() => {
    listeners.forEach((notify) => notify());
  }, 60_000);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer !== undefined) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

/**
 * Renders a release date relative to *now*.
 *
 * The page is served from the cache, so `initialLabel` was computed when the
 * cache entry was filled and can be arbitrarily old. It is used for the server
 * HTML and for hydration (no mismatch), then the label is recomputed on the
 * client and kept fresh.
 */
export function RelativeDate({
  timestamp,
  initialLabel,
}: {
  timestamp?: number;
  initialLabel: string;
}) {
  return useSyncExternalStore(
    subscribe,
    () => dateToRelative(timestamp),
    () => initialLabel,
  );
}
