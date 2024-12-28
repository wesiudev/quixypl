"use server";
export async function updateUserLeads(uid: any, data: any) {
  await fetch(`${process.env.NEXT_PUBLIC_URL}/api/updateUserLeads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid, data }),
  });
  return { success: true };
}
