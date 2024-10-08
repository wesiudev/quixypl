import localFont from "next/font/local";
import { Cardo } from "next/font/google";
import { Providers } from "@/redux/Provider";
import Script from "next/script";
import "../styles/globals.css";
import { Metadata, Viewport } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { scrollToTop } from "@/lib/scrollToTop";
import { FaChevronRight } from "react-icons/fa";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body
        className={`bg-white overflow-x-hidden relative ${cocosharp.variable} ${cardo.variable} ${gotham.variable}`}
      >
        <Providers>
          <div className="relative z-[9999999999]">
            <ToastContainer />
            <button
              onClick={scrollToTop}
              className="group flex flex-col fixed bottom-12 right-12 text-black bg-gray-300 px-3 py-2 rounded-md hover:bg-gray-400 duration-200"
            >
              <FaChevronRight className="text-sm -rotate-[90deg] group-hover:scale-75" />
              <FaChevronRight className="text-sm -mt-2 -rotate-[90deg] scale-75 group-hover:scale-100" />
              <FaChevronRight className="text-sm -mt-2 -rotate-[90deg] scale-50 group-hover:scale-75" />
            </button>
          </div>
          {children}
        </Providers>
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

const cardo = Cardo({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gotham",
});
//font
const gotham = localFont({
  src: [
    {
      path: "../../public/fonts/Gotham.ttf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../../public/fonts/Gotham-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "../../public/fonts/GothamBold.ttf",
      weight: "500",
      style: "bold",
    },
  ],
  variable: "--font-gotham",
});
const cocosharp = localFont({
  src: [
    {
      path: "../../public/fonts/Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Bold.ttf",
      weight: "700",
    },
    {
      path: "../../public/fonts/ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../../public/fonts/Light.ttf",
      weight: "300",
    },
    {
      path: "../../public/fonts/LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/Regular.ttf",
      weight: "500",
    },
  ],
  variable: "--font-cocosharp",
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
