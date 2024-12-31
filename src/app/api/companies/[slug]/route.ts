import { fetchUsers } from "@/firebase";
import { NextResponse } from "next/server";

export async function GET(params: any, req: any) {
  const { slug } = await req.params;
  const users = await fetchUsers();
  const user =
    users?.find(
      (user) =>
        !user?.seek &&
        user?.tags?.filter(
          (tag: any) =>
            tag?.slugUrl === slug ||
            tag?.url === slug ||
            tag?.categoryUrl === slug
        ).length > 0
    ) || {};
  return NextResponse.json({
    ...user,
    email: "hidden",
  });
}
