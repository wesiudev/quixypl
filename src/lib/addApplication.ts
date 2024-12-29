"use server";
export async function addApplication(data: any) {
  const isSuccess = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/addApplication/`,
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
