"use client";
import PortfolioItems from "@/components/Dashboard/Settings/SettingsInputs/PortfolioItems";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const [project, setProject] = useState<any>({
    images: [],
    days: 1,
    price: 24.41,
  });
  const [isUploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState();
  const { user } = useSelector((state: any) => state.user);
  return (
    <div className="bg-white py-6">
      <PortfolioItems
        source={user}
        setProject={setProject}
        project={project}
        setUploading={setUploading}
        setUploadCount={setUploadCount}
      />
    </div>
  );
}
