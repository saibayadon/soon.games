"use client";
import Link from "next/link";
import { CONSOLES, Consoles, TYPES, Types } from "~/data/constants";
import { setCookies } from "./actions";

export default function Navigation({
  selectedConsole,
  selectedType,
}: {
  selectedConsole: Consoles;
  selectedType: Types;
}) {
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
                  href={`/${key}/${selectedType}`}
                  onClick={() => {
                    setCookies(key as Consoles, selectedType);
                  }}
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
                  href={`/${selectedConsole}/${key}`}
                  onClick={() => {
                    setCookies(selectedConsole, key as Types);
                  }}
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
