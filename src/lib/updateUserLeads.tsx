"use server";
import { updateUser } from "@/firebase/";

export default async function updateUserLeads(uid: any, data: any) {
  await updateUser(uid, data);
}
