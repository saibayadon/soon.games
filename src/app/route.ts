import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isConsole, isType } from "~/data/constants";

export async function GET() {
  const cookieStore = await cookies();
  const selectedConsole =
    cookieStore.get("selectedConsole")?.value ?? "nintendo-switch-2";
  const selectedType = cookieStore.get("selectedType")?.value ?? "new";

  if (!isConsole(selectedConsole) || !isType(selectedType)) {
    redirect("/nintendo-switch-2/new");
  }

  redirect(`/${selectedConsole}/${selectedType}`);
}
