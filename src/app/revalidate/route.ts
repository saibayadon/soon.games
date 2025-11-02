import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tag = searchParams.get("tag");
  const path = searchParams.get("path");

  if (tag) {
    // Revalidate specific cache tag (e.g., /revalidate?tag=games-ps5-new)
    revalidateTag(tag, "hours");
    return Response.json({ revalidated: true, tag, now: Date.now() });
  }

  if (path) {
    // Revalidate specific path (e.g., /revalidate?path=/ps5/new)
    revalidatePath(path, "page");
    return Response.json({ revalidated: true, path, now: Date.now() });
  }

  // Revalidate all game pages
  revalidatePath("/[console]/[type]", "page");
  return Response.json({ revalidated: true, all: true, now: Date.now() });
}
