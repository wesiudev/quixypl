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
        <div className="flex flex-col relative overflow-hidden bg-zinc-800">
          <Hero />

          <div
            className="relative overflow-hidden h-full w-full text-white pt-20 pb-12 px-10"
            style={{ textShadow: "2px 2px 2px black" }}
          >
            <h1 className="text-4xl text-center relative z-50 text-orange-500">
              Kontakt z Quixy.pl
            </h1>
            <p className="text-lg text-center mt-4 relative z-50 max-w-lg mx-auto">
              Masz pytania? Skontaktuj się z nami, aby uzyskać więcej informacji
              na temat naszych usług i współpracy.
            </p>
          </div>

          {/* Conditional Form Section */}

          <div className="px-4 sm:px-0">
            <div className="mx-auto max-w-lg lg:max-w-2xl">
              <div className="bg-white shadow-lg relative z-50 rounded-t-xl pb-3 lg:pb-6">
                <h2
                  style={{ textShadow: "2px 2px 2px black" }}
                  className="p-3 lg:p-6 rounded-t-xl text-3xl text-white bg-orange-500"
                >
                  Formularz kontaktowy
                </h2>
                <p className="text-lg text-justify font-light text-black p-3 lg:p-6">
                  Chcesz o coś zapytać, dołączyć do naszego zespołu, a może masz
                  propozycję współpracy lub problem z naszymi usługami? Wypełnij
                  formularz, a my skontaktujemy się z Tobą w najblizszym czasie.
                </p>
                <div className="w-full flex flex-col px-3 lg:px-6">
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
                        className="w-full p-4 input-lg font-light text-black  rounded-xl"
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
                        className="input-lg font-light text-black  w-full p-4 rounded-xl"
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
                      className=" text-black min-h-full w-full p-4 textarea-lg font-light rounded-xl"
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
                  className="disabled:duration-500 btn-lg disabled:bg-blue-600 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white py-2 px-6 w-full disabled:hover:bg-blue-700 duration-75 rounded-b-lg"
                >
                  {!sent ? "Wyślij wiadomość" : "Wiadomość została wysłana"}
                </button>
              </div>
            </div>
          </div>
          <Image
            src="/assets/quixy-logo.png"
            width={224}
            height={224}
            alt=""
            className="w-[200px] h-auto my-12 mx-auto relative z-50"
          />
        </div>

        {/* Contact Info Section */}
        <div className="bg-orange-500 text-white py-12 px-6 flex flex-col items-center justify-center">
          <h2
            style={{ textShadow: "2px 2px 2px black" }}
            className="text-3xl lg:text-5xl text-white text-center"
          >
            Informacje Kontaktowe
          </h2>
          <p className="text-center mt-4 text-lg font-light max-w-lg">
            Możesz również skontaktować się z nami bezpośrednio:
          </p>
          <div className="flex flex-col items-center justify-center mt-4">
            <Link href="mailto:centrumbiznesu.quixy@gmail.com" className="">
              centrumbiznesu.quixy@gmail.com
            </Link>
            <Link href="tel:+48 575 793 394">+48 575 793 394</Link>
            <Link title="wesiudev" href="https://wesiudev.com">
              www.wesiudev.com
            </Link>
          </div>
        </div>
      </div>

      <MainFooter jobsList={jobs} />
    </div>
  );
}
