import User from "../../components/User";
import DashboardUnderMenu from "../../components/DashboardUnderMenu";
import UserPanel from "@/components/UserPanel";
import Image from "next/image";
import Link from "next/link";
export default async function Page() {
  return (
    <div>
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-3 bg-white pt-6 text-xl lg:text-3xl px-4 lg:px-6 font-extrabold text-black"
      >
        <Image
          src="/favicons/android-chrome-192x192.png"
          width={124}
          height={124}
          alt="Logo Quixy"
          className="w-12 h-12"
        />
        <h1 className="">Panel Administracyjny</h1>
      </Link>
      <UserPanel />
      <DashboardUnderMenu />
      <User />
    </div>
  );
}
