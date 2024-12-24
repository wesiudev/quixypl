import Link from "next/link";
import VerifyPayment from "../../../components/VerifyPayment";
import { getDocument } from "@/firebase";
import { Metadata } from "next";
import Image from "next/image";
export default async function Page(props: {
  params: Promise<{ orderId: string }>;
}) {
  const params = await props.params;
  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/stripe/orders?secret=${process.env.API_SECRET_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    }
  ).then((res) => res.json());
  const order = orders?.data?.find(
    (o: any) => o?.metadata?.id === params.orderId
  );
  const orderToCompare = await getDocument("orders", params.orderId);
  const user = await getDocument("users", order?.metadata?.uid);

  return (
    <>
      {order?.payment_status !== "paid" && (
        <div className="bg-gradient-to-b from-accentStart to-accentEnd flex flex-col items-center justify-center text-black font-gotham h-screen left-0 top-0 w-screen">
          <div className="p-4 lg:p-12 bg-white rounded-lg">
            <Image
              src="/assets/quixy-logo.png"
              width={224}
              height={224}
              alt="Logo serwisu quixy.pl"
              className="w-[88px] h-auto mx-auto"
            />
            <h1 className="text-3xl font-bold text-center mt-3">
              Wystąpił błąd
            </h1>
            <p className="text-lg text-center max-w-lg my-2 font-light">
              Płatność nie powiodła się. Nie pobraliśmy środków z twojego konta.
            </p>
            <Link
              href="/user"
              className="text-black font-bold text-xl flex flex-row items-center relative z-50 w-max max-w-full mx-auto"
            >
              <div className="bg-gradient-to-b from-ctaStart to-ctaEnd p-2 text-white rounded-md px-12">
                Panel Użytkownika
              </div>
            </Link>
          </div>
        </div>
      )}
      {order?.payment_status === "paid" && (
        <div className="bg-gradient-to-b from-accentStart to-accentEnd flex flex-col items-center justify-center text-black font-gotham h-screen left-0 top-0 w-screen">
          <div className="p-4 lg:p-12 bg-white rounded-lg">
            <Image
              src="/assets/quixy-logo.png"
              width={224}
              height={224}
              alt="Logo serwisu quixy.pl"
              className="w-[88px] h-auto mx-auto"
            />
            <h1 className="text-3xl font-bold text-center mt-3">Sukces!</h1>
            <p className="text-lg text-center max-w-lg my-2 font-light">
              Dziękujemy za zakupy! {order.metadata.quantity}💎 zostało
              przypisane do Twojego konta.
            </p>
            <Link
              href="/user"
              className="text-black font-bold text-xl flex flex-row items-center relative z-50 mx-auto w-max max-w-full"
            >
              <div className="bg-gradient-to-b from-ctaStart to-ctaEnd p-2 text-white rounded-md px-12">
                Panel Użytkownika
              </div>
            </Link>
          </div>
        </div>
      )}
      {order.payment_status === "paid" && !orderToCompare?.realized && (
        <VerifyPayment
          order={order}
          user={user}
          orderToCompare={orderToCompare}
        />
      )}
    </>
  );
}

export const metadata: Metadata = {
  icons: [
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
    {
      url: "/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
  publisher: "wesiu.dev",
  manifest: "/manifest.json",
  authors: [
    {
      name: "wesiudev",
      url: "https://wesiudev.com",
    },
  ],
  verification: {
    google: "google85185d3abec28326.html",
  },
  title: "Przetwarzanie danych...",
  description:
    "Zatrudnij ekspertów z branży IT, marketingu, designu i innych dziedzin. Znajdź specjalistów w Quixy Talent™ i rozwijaj swój biznes już dziś!",
};
