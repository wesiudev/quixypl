import { pushLead } from "@/firebase";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  return (
    <div className="bg-white">
      {!success ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-blue-500 font-medium">
              Imię
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-blue-500 rounded-md"
              placeholder="Wpisz swoje imię"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-blue-500 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-blue-500 rounded-md"
              placeholder="Wpisz swój email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-blue-500 font-medium"
            >
              Wiadomość
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full p-2 border border-blue-500 rounded-md"
              placeholder="Napisz swoją wiadomość"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white font-medium p-2 rounded-md"
            onClick={() => {
              if (!email || !name || !message) {
                toast.error("Proszę uzupełnić wszystkie pola", {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                pushLead({
                  name,
                  message,
                  email,
                });
                setSuccess(true);
              }
            }}
          >
            Wyślij
          </button>
        </div>
      ) : (
        <p className="text-blue-500 text-center">
          Wiadomość została wysłana pomyślnie! Dziękujemy za kontakt.
        </p>
      )}
    </div>
  );
}
