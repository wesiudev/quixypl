"use client";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";
import { auth, db } from "@/firebase";
import { toast } from "react-toastify";
import { FaChevronLeft, FaPencilAlt, FaSave } from "react-icons/fa";

export default function Page() {
  const [user, loading] = useAuthState(auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [hover, setHover] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const jobOffer = {
      title,
      description,
      requirements,
      category,
      location,
      salary,
      email,
      phone,
      website,
      createdAt: Date.now(),
      authorId: user?.uid,
    };

    try {
      await addDoc(collection(db, "offers"), jobOffer);
      setTitle("");
      setDescription("");
      setRequirements("");
      setCategory("");
      setLocation("");
      setSalary("");
      setEmail("");
      setPhone("");
      setWebsite("");
    } catch (error) {
      toast.error(error?.toString());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-cta">Dodaj ofertę pracy</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md">
        <label className="mb-2 text-black" htmlFor="title">
          <FaPencilAlt className="mr-2" />
          Tytuł
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />

        <label className="mb-2 text-black" htmlFor="description">
          <FaPencilAlt className="mr-2" />
          Opis
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />

        <label className="mb-2 text-black" htmlFor="requirements">
          <FaPencilAlt className="mr-2" />
          Wymagania
        </label>
        <textarea
          id="requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />

        <label className="mb-2 text-black" htmlFor="category">
          <FaPencilAlt className="mr-2" />
          Kategoria
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Wybierz</option>
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
          <option value="Inne">Inne</option>
        </select>

        <label className="mb-2 text-black" htmlFor="location">
          <FaPencilAlt className="mr-2" />
          Lokalizacja
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />

        <label className="mb-2 text-black" htmlFor="salary">
          <FaPencilAlt className="mr-2" />
          Wynagrodzenie
        </label>
        <input
          type="text"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />

        <label className="mb-2 text-black" htmlFor="email">
          <FaPencilAlt className="mr-2" />
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />

        <label className="mb-2 text-black" htmlFor="phone">
          <FaPencilAlt className="mr-2" />
          Telefon
        </label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />

        <label className="mb-2 text-black" htmlFor="website">
          <FaPencilAlt className="mr-2" />
          Strona internetowa
        </label>
        <input
          type="text"
          id="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />

        <button
          className="mt-4 p-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <FaSave className="mr-2" />
          Dodaj
        </button>
      </form>
      <Link
        href="/dashboard"
        className="mt-4 p-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <FaChevronLeft className="mr-2" />
        Powrót do panelu
      </Link>
    </div>
  );
}
