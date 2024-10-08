"use client";
import moment from "moment";
import Link from "next/link";
import { useSelector } from "react-redux";
import "moment/locale/pl";
export default function Page() {
  const { user } = useSelector((state: any) => state.user);
  function setApplicationOpen(id: string) {}
  return (
    <div className="flex flex-col lg:pl-[30rem]">
      {user?.applications?.map((application: any) => (
        <div key={application.id}>
          <button onClick={() => setApplicationOpen(application.id)}>
            {application.title}
            {application.applicant}
            {moment(application.creationTime).fromNow()}
          </button>
        </div>
      ))}
    </div>
  );
}
