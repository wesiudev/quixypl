"use client";
import Header from "@/components/Header";
import jobs from "../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Hero from "@/components/Hero";
import Link from "next/link";
import Image from "next/image";
import { pushLead } from "@/firebase";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaEnvelope } from "react-icons/fa6";

export default function Contact() {
  const [data, setData] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen flex flex-col font-gotham">
      <Header jobsList={jobs} />

      <div className="flex-grow">
        {/* Contact Section */}
        <div className="flex flex-col relative overflow-hidden bg-white">
          {/* Conditional Form Section */}
          <div className="bg-white py-12 container mx-auto px-4">
            <div className="font-light text-black flex flex-col breadcrumbs">
              <ul className="flex items-center flex-wrap">
                <li className="">
                  <Link href={`/`} title="praca zdalna">
                    home
                  </Link>
                </li>
                <li className="">
                  <Link href="contact" title="kontakt">
                    contact
                  </Link>
                </li>
              </ul>
            </div>
            <h1 className="pt-6 text-3xl lg:text-5xl font-gotham bg-white text-zinc-800">
              Skontaktuj się z nami!
            </h1>
          </div>
          <div className="px-4 py-24 bg-gray-200">
            <div className="mx-auto container flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-6">
              <div
                style={{ boxShadow: "0px 0px 5px black" }}
                className="max-w-lg lg:max-w-lg xl:max-w-2xl  overflow-hidden"
              >
                <div className="bg-white shadow-lg relative z-50 pb-3 lg:pb-6 mx-auto lg:mx-0">
                  <h2 className="flex items-center p-6 text-3xl text-white bg-gradient-to-r font-light italic font-coco from-primary to-cta">
                    <FaEnvelope className="mr-2" /> Wypełnij formularz
                  </h2>
                  <p className="text-lg text-justify font-light text-black p-6">
                    Chcesz o coś zapytać, dołączyć do naszego zespołu, a może
                    masz propozycję współpracy lub problem z naszymi usługami?
                    Wypełnij formularz, a my skontaktujemy się z Tobą w
                    najblizszym czasie.
                  </p>
                  <div className="w-full flex flex-col px-6">
                    <div className="flex flex-col lg:flex-row lg:space-x-6 w-full">
                      <div className="w-full">
                        <label
                          className="text-black block text-lg font-light mb-2"
                          htmlFor="name"
                        >
                          Imię
                        </label>
                        <input
                          onChange={(e: any) =>
                            setData({ ...data, name: e.target.value })
                          }
                          value={data.name}
                          type="text"
                          id="name"
                          className="w-full p-4 input-lg font-light text-black  "
                          placeholder="Wpisz swoje imię"
                        />
                      </div>

                      <div className="w-full">
                        <label
                          className="text-black block text-lg font-light mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          onChange={(e: any) =>
                            setData({ ...data, email: e.target.value })
                          }
                          value={data.email}
                          type="email"
                          id="email"
                          className="input-lg font-light text-black  w-full p-4 "
                          placeholder="Wpisz swój email"
                        />
                      </div>
                    </div>

                    <div className="w-full h-full mt-3">
                      <label
                        className="block text-black text-lg font-light mb-2"
                        htmlFor="message"
                      >
                        Wiadomość
                      </label>
                      <textarea
                        onChange={(e: any) =>
                          setData({ ...data, message: e.target.value })
                        }
                        value={data.message}
                        id="message"
                        className=" text-black min-h-full w-full p-4 textarea-lg font-light "
                        placeholder="Wpisz swoją wiadomość"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center z-50 relative font-light">
                  <button
                    onClick={(e: any) => {
                      e.preventDefault();
                      const id = toast.loading(<span>Sekundarnie...</span>);
                      if (data.name && data.email && data.message) {
                        pushLead(data).then(() => {
                          setSent(true);
                          toast.update(id, {
                            render: "Wiadomość została wysłana",
                            type: "success",
                            isLoading: false,
                            autoClose: 2000,
                            onClose: () => {
                              setData({
                                email: "",
                                name: "",
                                message: "",
                              });
                            },
                          });
                        });
                      } else {
                        toast.update(id, {
                          render: "Wypełnij wszystkie pola",
                          type: "error",
                          isLoading: false,
                          autoClose: 2000,
                        });
                      }
                    }}
                    disabled={sent}
                    className="disabled:duration-500 btn-lg disabled:bg-blue-600 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white py-2 px-6 w-full disabled:hover:bg-blue-700 duration-75"
                  >
                    {!sent ? "Wyślij wiadomość" : "Wiadomość została wysłana"}
                  </button>
                </div>
              </div>
              <div className="text-zinc-800 py-12 lg:py-0 flex flex-col items-center justify-center lg:items-start lg:justify-start w-full">
                <h2 className="pt-2 text-3xl text-white text-center lg:text-left">
                  <span className="font-light italic font-coco p-2  w-max max-w-full bg-gradient-to-r from-primary to-cta">
                    Informacje Kontaktowe
                  </span>
                </h2>
                <p className="text-center lg:text-left mt-4 text-lg font-light max-w-lg">
                  Możesz również skontaktować się z nami bezpośrednio:
                </p>
                <div className="flex flex-col items-center justify-center lg:justify-start lg:items-start mt-4">
                  <Link
                    href="mailto:centrumbiznesu.quixy@gmail.com"
                    className=""
                  >
                    centrumbiznesu.quixy@gmail.com
                  </Link>
                  <Link href="tel:+48 575 793 394">+48 575 793 394</Link>
                  <Link title="wesiudev" href="https://wesiudev.com">
                    www.wesiudev.com
                  </Link>
                </div>
                <Image
                  src="/assets/quixy-logo.png"
                  width={224}
                  height={224}
                  alt=""
                  className="w-24 h-auto mx-auto lg:mx-0 relative z-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
      </div>

      <MainFooter jobsList={jobs} />
    </div>
  );
}
