import Image from "next/image";
import { FaImage } from "react-icons/fa";
import Link from "next/link";
import jobs from "../../../../public/14.09.2024.json";
import { getProductByUrl, getProducts } from "@/firebase";
import { renderMarkdown } from "@/lib/parseMarkdown";
import BlogPostList from "@/components/BlogPostList";
import Header from "@/components/Header";
import MainFooter from "@/components/MainFooter";
export async function generateStaticParams() {
  const products = await getProducts();
  return products?.map((product: any) => ({
    slug: product?.url,
  }));
}
export const revalidate = 30;
export default async function Page({ params }: { params: any }) {
  const product: any = await getProductByUrl(params?.slug);
  const products: any = await getProducts();

  return (
    <div className="overflow-x-hidden">
      <Header jobsList={jobs} />

      <div className="px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 pt-12 pb-24 bg-white">
        <div className="font-coco flex flex-row mb-12 text-zinc-800 text-lg flex-wrap items-center">
          <Link
            href="/"
            className="hover:underline text-sm md:text-base lg:text-lg xl:text-xl w-max"
          >
            strona główna
          </Link>
          <div className="mx-2 text-sm md:text-base lg:text-lg xl:text-xl">
            <div className="text-black font-bold mx-2">|</div>
          </div>
          <Link
            href="/blog"
            className="hover:underline text-sm md:text-base lg:text-lg xl:text-xl w-max"
          >
            blog
          </Link>
          <div className="flex items-center text-sm md:text-base lg:text-lg xl:text-xl w-max">
            <div className="mx-2 text-black font-bold">|</div>
            {product?.url}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 mx-auto">
          <div className="flex flex-col">
            {/* LG TITLE VISIBLE */}
            {product?.title && (
              <h1
                style={{ lineHeight: 1.15 }}
                className="text-2xl sm:text-5xl font-extrabold text-left mb-6 drop-shadow-xl shadow-black text-zinc-800"
              >
                {product?.title}
              </h1>
            )}
            {product?.shortDesc && (
              <div
                style={{ boxShadow: "0px 0px 5px #000000" }}
                className="bg-primary p-3 text-white text-lg lg:text-xl !font-gotham"
                dangerouslySetInnerHTML={renderMarkdown(product?.shortDesc)}
              />
            )}
            {!product?.primaryImage && (
              <div className="bg-gray-300 hover:bg-opacity-80 duration-300 flex items-center justify-center rounded-3xl w-full aspect-square mt-6 lg:hidden text-7xl text-gray-500">
                <FaImage />
              </div>
            )}
            {product?.primaryImage !== "" && (
              <div className="relative lg:hidden">
                <Image
                  src={product?.primaryImage}
                  width={1024}
                  height={1024}
                  alt={`Obraz ${product?.title}`}
                  className="w-full h-auto mt-6"
                  style={{ boxShadow: "0px 0px 5px #000000" }}
                />
                <div className="w-max absolute bottom-4 right-4">
                  <Link href="/" className="">
                    <Image
                      src="/assets/quixy-logo.png"
                      width={420}
                      height={420}
                      alt=""
                      className="w-[80px]"
                    />
                  </Link>
                </div>
              </div>
            )}
            {product?.text1Title && (
              <h2 className="text-3xl font-bold mt-12 mb-4 drop-shadow-xl shadow-black text-zinc-800 ">
                {product?.text1Title}
              </h2>
            )}
            {product?.text1Desc && (
              <div
                className="text-gray-700 font-light text-lg !bg-white"
                dangerouslySetInnerHTML={renderMarkdown(product?.text1Desc)}
              />
            )}
            {product?.text2Title && (
              <h2 className="text-3xl font-bold mt-6 drop-shadow-xl shadow-black text-zinc-800 mb-4">
                {product?.text2Title}
              </h2>
            )}
            {product?.text2Desc && (
              <div
                className="text-gray-700 font-light text-lg"
                dangerouslySetInnerHTML={renderMarkdown(product?.text2Desc)}
              />
            )}
          </div>
          <div className="flex flex-col">
            {!product?.primaryImage && (
              <div className="bg-gray-300 hover:bg-opacity-80 duration-300 items-center justify-center rounded-3xl w-full aspect-square hidden lg:flex text-7xl text-gray-500">
                <FaImage />
              </div>
            )}
            {product?.primaryImage !== "" && (
              <div className="relative hidden lg:block">
                <Image
                  src={product?.primaryImage}
                  width={1024}
                  height={1024}
                  alt={`Obraz ${product?.title}`}
                  className="w-full h-auto"
                  style={{ boxShadow: "0px 0px 5px #000000" }}
                />
                <div className="w-max absolute bottom-4 right-4">
                  <Link href="/" className="">
                    <Image
                      src="/assets/quixy-logo.png"
                      width={420}
                      height={420}
                      alt=""
                      className="lg:w-[80px]"
                    />
                  </Link>
                </div>
              </div>
            )}
            {product?.text3Title && (
              <h2 className="text-3xl font-bold mt-6 lg:mt-12 drop-shadow-xl shadow-black text-zinc-800 mb-4">
                {product?.text3Title}
              </h2>
            )}
            {product?.text3Desc && (
              <div
                className="text-gray-700 font-light text-lg"
                dangerouslySetInnerHTML={renderMarkdown(product?.text3Desc)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white pb-12">
        {product?.secondaryImage !== "" &&
          product?.text4Title !== "" &&
          product?.text4Desc !== "" && (
            <div className=" grid grid-cols-1 lg:grid-cols-2 px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 gap-12">
              <div className="relative w-full">
                {!product?.secondaryImage && (
                  <div
                    style={{ boxShadow: "0px 0px 5px #000000" }}
                    className="bg-gray-300 hover:bg-opacity-80 duration-300 items-center justify-center rounded-3xl w-full aspect-square flex text-7xl text-gray-500"
                  >
                    <FaImage />
                  </div>
                )}
                {product?.secondaryImage !== "" && (
                  <div className="relative">
                    <Image
                      style={{ boxShadow: "0px 0px 5px #000000" }}
                      src={product?.secondaryImage}
                      width={1024}
                      height={1024}
                      alt={`quixy.pl ${product?.title}`}
                      className="w-full h-auto"
                    />
                    <div className="w-max absolute bottom-4 right-4">
                      <Link href="/" className="">
                        <Image
                          src="/assets/quixy-logo.png"
                          width={420}
                          height={420}
                          alt=""
                          className="w-[80px]"
                        />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <h2 className="text-3xl text-left font-bold  drop-shadow-xl shadow-black text-zinc-800">
                  {product?.text4Title}
                </h2>
                <div
                  className="text-gray-700 font-light text-lg mt-4"
                  dangerouslySetInnerHTML={renderMarkdown(product?.text4Desc)}
                />
              </div>
            </div>
          )}
      </div>
      <div className="px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-32 pt-12 pb-24">
        {products?.length > 1 && <BlogPostList posts={products} />}
      </div>
      <div className="w-full flex justify-center mt-12">
        <Image
          src="/assets/quixy-logo.png"
          width={224}
          height={224}
          alt="logo Quixy strona bloga slug"
          className=""
        />
      </div>
      <MainFooter jobsList={jobs} />
    </div>
  );
}
export async function generateMetadata({ params }: { params: any }) {
  // fetch data
  const product: any = await getProductByUrl(params?.slug);

  return {
    title: product?.googleTitle,
    description: product?.googleDescription || "",
    publisher: "wesiudev.com",
    url: `https://quixy.pl/blog/${product?.url}`,
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
    icons: [
      {
        url: "/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicons/favicon.ico",
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
    openGraph: {
      type: "website",
      url: `https://quixy.pl/blog/${product?.url}`,
      title: product?.googleTitle,
      description: product?.googleDescription,
      siteName: "Quixy",
      images: [
        {
          url: product?.primaryImage,
          type: "image/png",
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      site: "@Quixy",
      title: product?.googleTitle,
      description: product?.googleDescription,
      image: {
        url: product?.primaryImage,
      },
    },
    meta: [
      {
        name: "theme-color",
        content: "#fff", // replace with your desired theme color
      },
    ],
  };
}
