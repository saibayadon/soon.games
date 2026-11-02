"use client";
import Link from "next/link";
import { useEffect } from "react";
import { CONSOLES, Consoles, TYPES, Types } from "~/data/constants";

export default function Navigation({
  selectedConsole,
  selectedType,
}: {
  selectedConsole: Consoles;
  selectedType: Types;
}) {
  // Remember the last viewed list for the "/" redirect. Done on view rather
  // than on click, so direct visits and back/forward navigation count too.
  useEffect(() => {
    document.cookie = `selectedConsole=${selectedConsole}; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `selectedType=${selectedType}; path=/; max-age=31536000; SameSite=Lax`;
  }, [selectedConsole, selectedType]);

  return (
    <nav className="flex flex-col flex-wrap text-sm font-bold">
      <div>
        <span className="mr-2 inline-block text-black">platform:</span>
        <ul className="inline-block text-(--selected-color)">
          {Object.keys(CONSOLES).map((key) => {
            const c = CONSOLES[key as Consoles];
            return (
              <li className="mr-2 inline-block" key={key}>
                <Link
                  className={`hover:underline ${
                    selectedConsole === key ? "underline" : ""
                  }`}
                  // Resolve the cached list for this exact URL ahead of the
                  // click. Skip the page we're already on.
                  prefetch={selectedConsole !== key}
                  href={`/${key}/${selectedType}`}
                >
                  {c}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <span className="mr-2 inline-block text-black">type:</span>
        <ul className="inline-block text-(--selected-color)">
          {Object.keys(TYPES).map((key) => {
            const t = TYPES[key as Types];
            return (
              <li className="mr-2 inline-block" key={key}>
                <Link
                  className={`hover:underline ${
                    selectedType === key ? "underline" : ""
                  }`}
                  prefetch={selectedType !== key}
                  href={`/${selectedConsole}/${key}`}
                >
                  {t}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
