import { redirect } from "next/navigation";
import Navigation from "./navigation";
import { CONSOLES, Consoles, TYPES, Types } from "~/data/constants";

export default async function ListLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{
      console: Consoles;
      type: Types;
    }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  const selectedConsole = params.console;
  const selectedType = params.type;

  // Validate URL - or go back to the root
  if (!(selectedConsole in CONSOLES) || !(selectedType in TYPES)) {
    redirect("/");
  }

  return (
    <main className={`flex flex-col p-8 ${selectedConsole} h-dvh`}>
      <h1 className="headline-underline relative z-10 my-5 text-6xl font-bold">
        SOON.GAMES
      </h1>
      <Navigation
        selectedConsole={selectedConsole}
        selectedType={selectedType}
      />
      <section className="my-4 flex-1">{children}</section>
      <footer className="pb-4 text-xs font-bold text-gray-500">
        <p>all information is scraped from metacritic.</p>
        <p>crafted in the melting summer of buenos aires by @saibayadon</p>
        <p>31/12/2023</p>
      </footer>
    </main>
  );
}
