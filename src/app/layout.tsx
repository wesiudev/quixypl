import { Lato } from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";
import { Metadata, Viewport } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "@/redux/Provider";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/Header"));
const MainFooter = dynamic(() => import("@/components/MainFooter"));
import { Open_Sans } from "next/font/google";
export const revalidate = 60;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());
  const categories = await jobs.flatMap((job: any) => [
    { title: job.title, data: job.data.map((subItem: any) => subItem) },
  ]);
  return (
    <html lang="pl">
      <body
        className={`font-sans scrollbar bg-white overflow-x-hidden relative ${lato.variable} ${sans.variable}`}
      >
        <Header jobsList={categories} />
        <div className="relative z-[9999999999]">
          <ToastContainer />
        </div>
        <Providers>{children}</Providers>
        <MainFooter jobsList={categories} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=GT-WRDF58Q" />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GT-WRDF58Q');
          `}
        </Script>
      </body>
    </html>
  );
}

const sans = Open_Sans({
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});
const lato = Lato({
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});
export const viewport: Viewport = {
  themeColor: "#F87315",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export const metadata: Metadata = {
  icons: "/favicon.ico",
  publisher: "wesiu.dev",
  manifest: "/manifest.json",
  authors: [
    {
      name: "wesiudev",
      url: "https://wesiudev.com",
    },
    {
      name: "quixy",
      url: "https://quixy.pl",
    },
  ],
  verification: {
    google: "google85185d3abec28326.html",
  },
  openGraph: {
    type: "website",
    url: "https://quixy.pl",
    siteName: "Quixy",
  },
};
