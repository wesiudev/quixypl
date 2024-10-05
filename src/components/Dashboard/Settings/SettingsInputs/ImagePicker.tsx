"use client";
import { useState } from "react";
import { FaImages } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";

export default function ImagePicker({
  handler,
  user,
}: {
  handler: any;
  user: any;
}) {
  const [dragging, setDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter((prev) => prev + 1);
    setDragging(true);
  };

  const handleDragEnd = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter((prev) => prev - 1);
    if (dragCounter <= 1) {
      setDragging(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (e.dataTransfer.files.length) {
      const filesArray = Array.from(e.dataTransfer.files); // Convert FileList to Array
      handler(filesArray); // Pass the array of files to the handler
    }
  };

  return (
    <div
      className={`mt-3 bg-white z-[60] w-full overflow-x-hidden ${
        dragging ? "bg-red-500 cursor-grabbing" : ""
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDragEnd}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="w-full">
        <div className="w-full py-6 flex items-center justify-center text-center flex-col bg-orange-500 rounded-xl">
          <FaImages className="text-4xl text-white mb-3" />
          <div className="font-light text-white">
            Dodaj zdjęcia lub upuść pliki tutaj
          </div>
          <label
            htmlFor="uploader"
            className="w-max mt-4 py-3 px-12 text-center justify-center items-center flex font-gotham bg-white rounded-xl duration-300 text-orange-500 hover:text-white hover:bg-orange-500 hover:underline"
          >
            <FaUpload className="mr-2" />
            Dodaj zdjęcia
          </label>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e: any) => {
          const files = e.target.files;
          const imageFiles = Array.from(files).filter((file: any) =>
            file.type.startsWith("image/")
          );
          handler(imageFiles); // Now it's a proper array of images
        }}
        id="uploader"
        className="text-white hidden"
      />
    </div>
  );
}
