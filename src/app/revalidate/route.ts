import { revalidatePath } from "next/cache";

export async function GET() {
  revalidatePath("/[console]/[type]/", "page");
  return Response.json({ status: 200 });
}
