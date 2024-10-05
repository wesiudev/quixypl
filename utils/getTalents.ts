"use server";

import { fetchTalents } from "@/firebase";

export async function getTalents() {
  const talents = await fetchTalents();

  return talents;
}
