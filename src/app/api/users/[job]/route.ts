import { fetchUsers } from "@/firebase";
import { NextResponse } from "next/server";

export async function GET(params: any, req: any) {
  const { job } = await req.params;
  const users = await fetchUsers();
  const filteredUsers = users
    ?.filter(
      (user) =>
        user?.emailVerified &&
        user?.pseudo &&
        user?.configured &&
        user?.name &&
        user?.access &&
        user?.tags?.filter(
          (tag: any) =>
            tag?.slugUrl === job || tag?.url === job || tag?.categoryUrl === job
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
      access: user?.access,
    }));
  return NextResponse.json(filteredUsers);
}
