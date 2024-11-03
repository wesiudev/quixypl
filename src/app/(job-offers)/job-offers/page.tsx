import { getDocuments } from "@/firebase";
import { JobPosting } from "@/types";
import Link from "next/link";

export default async function Page() {
  const job_offers = await getDocuments("job_offers");
  return (
    <div className="bg-white">
      <h1 className="text-center text-3xl font-bold my-4">
        Oferty pracy zdalnej
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {job_offers.map((job: any) => (
          <li key={job.id} className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p>{job.description}</p>
            <p>
              <Link href={`/job-offers/${job.id}`}>
                <a className="text-blue-500">Więcej</a>
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
