"use client";
import { useState } from "react";
import BackpackImageThumbnail from "./components/ImageThumbnail";
import GenerateImageDashboard from "@/components/GenerateImageDashboard";
import ImageOpen from "./ImageOpen";
import BackpackEmpty from "./BackpackEmpty";

export default function Backpack({ user }: { user: any }) {
  const [imageOpen, setImageOpen] = useState({
    src: "",
    prompt: "",
    author: "",
    creationTime: 0,
  });
  return (
    <>
      <div className="font-gotham bg-primary p-6">
        <ImageOpen imageOpen={imageOpen} setImageOpen={setImageOpen} />
        {!user?.generatedImages?.length && <BackpackEmpty user={user} />}
        {user?.generatedImages?.length > 0 && (
          <>
            <GenerateImageDashboard />
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-3 pb-12 gap-3">
              {user?.generatedImages?.map((image: any, i: any) => (
                <div key={i}>
                  <BackpackImageThumbnail
                    image={image}
                    setImageOpen={setImageOpen}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
