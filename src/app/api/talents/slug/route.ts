import { fetchUsers } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const slug = req.nextUrl.searchParams.get("slug");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json("not found", { status: 404 });
  }
  const users = await fetchUsers();
  const talents = users
    .filter(
      (user) =>
        user?.seek === true &&
        user?.seek !== "ask" &&
        user?.emailVerified &&
        user?.pseudo &&
        user?.configured &&
        user?.name &&
        user?.access &&
        user?.tags?.filter(
          (tag: any) => (tag?.slugUrl || tag?.url || tag?.categoryUrl) === slug
        ).length > 0
    )
    .map((user: any) => ({
      seek: user?.seek,
      name: user?.name,
      pseudo: user?.pseudo,
      email: "hidden",
      photoURL: user?.photoURL,
      city: user?.city,
      title: user?.title,
    }));
  return NextResponse.json(talents);
}
