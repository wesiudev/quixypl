"use server";

import { fetchOffers } from "@/firebase";

export async function getJobOffers() {
  const offers = await fetchOffers();

  return offers;
}
