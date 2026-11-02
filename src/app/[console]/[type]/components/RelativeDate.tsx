"use client";

import { useSyncExternalStore } from "react";
import { dateToRelative } from "~/lib/utils/date";

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
 * `initialLabel` comes from the cached render and may be stale. It is used for
 * SSR and hydration, then the label is recomputed on the client.
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
