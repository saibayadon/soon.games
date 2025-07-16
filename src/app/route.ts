import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { CONSOLES, TYPES } from "~/data/constants";

export async function GET() {
  const selectedConsole =
    (await cookies()).get("selectedConsole")?.value || "nintendo-switch-2";
  const selectedType = (await cookies()).get("selectedType")?.value || "new";

  if (!(selectedConsole in CONSOLES) || !(selectedType in TYPES)) {
    redirect("/nintendo-switch-2/new");
  } else {
    redirect(`/${selectedConsole}/${selectedType}`);
  }
}
