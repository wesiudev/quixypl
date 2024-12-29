"use server";
export async function addOrder(data: any) {
  const isSuccess = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/addOrder/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    }
  ).then((res: any) => res.json());
  return isSuccess;
}
