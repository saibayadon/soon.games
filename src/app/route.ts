import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { CONSOLES, TYPES } from "~/data/constants";

export async function GET(request: Request) {
  const selectedConsole =
    (await cookies()).get("selectedConsole")?.value || "nintendo-switch";
  const selectedType = (await cookies()).get("selectedType")?.value || "new";

  if (!(selectedConsole in CONSOLES) || !(selectedType in TYPES)) {
    redirect("/nintendo-switch/new");
  } else {
    redirect(`/${selectedConsole}/${selectedType}`);
  }
}
