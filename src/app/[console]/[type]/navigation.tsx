"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CONSOLES, Consoles, TYPES, Types } from "~/data/constants";

export default function Navigation({
  selectedConsole,
  selectedType,
}: {
  selectedConsole: Consoles;
  selectedType: Types;
}) {
  const router = useRouter();

  const setPreferenceCookies = (console: Consoles, type: Types) => {
    document.cookie = `selectedConsole=${console}; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `selectedType=${type}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const prefetchOnHover = (href: string) => {
    router.prefetch(href);
  };

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
                  prefetch={false}
                  href={`/${key}/${selectedType}`}
                  onMouseEnter={() => {
                    prefetchOnHover(`/${key}/${selectedType}`);
                  }}
                  onFocus={() => {
                    prefetchOnHover(`/${key}/${selectedType}`);
                  }}
                  onClick={() => {
                    setPreferenceCookies(key as Consoles, selectedType);
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
                  prefetch={false}
                  href={`/${selectedConsole}/${key}`}
                  onMouseEnter={() => {
                    prefetchOnHover(`/${selectedConsole}/${key}`);
                  }}
                  onFocus={() => {
                    prefetchOnHover(`/${selectedConsole}/${key}`);
                  }}
                  onClick={() => {
                    setPreferenceCookies(selectedConsole, key as Types);
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
