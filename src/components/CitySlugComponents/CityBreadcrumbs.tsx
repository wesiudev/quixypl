import Link from "next/link";

export default function CityBreadcrumbs({ params }: { params: any }) {
  return (
    <div className="breadcrumbs py-4 text-sm">
      <ul className="space-x-2 font-coco text-black flex flex-wrap w-full">
        <li>
          <Link href={`/praca-zdalna`} className="text-black">
            praca-zdalna
          </Link>
        </li>
        <li>
          <Link href={`/praca-zdalna/${params.slug}`} className="text-black">
            {params.slug}
          </Link>
        </li>
        <li>
          <Link
            href={`/praca-zdalna/${params.slug}/${params.category}`}
            className="text-black"
          >
            {params.category}
          </Link>
        </li>
        <li>
          <Link
            href={`/praca-zdalna/${params.slug}/${params.category}/${params.job}`}
            className="text-black"
          >
            {params.job}
          </Link>
        </li>
        <li>
          <Link
            href={`/praca-zdalna/${params.slug}/${params.category}/${params.job}/${params.city}`}
            className="text-black"
          >
            {params.city}
          </Link>
        </li>
      </ul>
    </div>
  );
}
