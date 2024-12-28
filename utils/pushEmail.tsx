"use server";
import { addDocument, getDocument } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
export async function pushEmail(email: string, isChecked: boolean) {
  const uniqueId = uuidv4();
  const exist = await getDocument("leads", email);
  if (exist) {
    return { error: "email already exist", code: 400 };
  }
  await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/sendEmail?email=${email}&tubylytylkofigi=${process.env.API_SECRET_KEY}`
  );
  return await addDocument("leads", email, {
    email,
    isChecked,
    createdAt: Date.now(),
    id: uniqueId,
  });
}
