import jobs from "../../public/14.09.2024.json";
import { polishToEnglish } from "../../utils/polishToEnglish";

export default async function sitemap() {
  const slugs = jobs.flatMap((service: any) => service);
  const categories = jobs.flatMap((service: any) =>
    service.data.flatMap((subItem: any) => ({
      category: subItem.title,
      slug: service.title,
      data: subItem.data,
    }))
  );
  const jobsData = jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => ({
        category: subItem.title,
        slug: service.title,
        data: subItem.data.flatMap((item: any) => ({
          title: item.title,
          category: subItem.title,
          slug: service.title,
        })),
      }))
    )
    .flatMap((item: any) => item.data);
  const slugsMap = slugs.map((item: any) => ({
    url: `${process.env.NEXT_PUBLIC_URL}/praca-zdalna/${polishToEnglish(
      item.title
    )}`,
    lastModified: new Date().toISOString(),
  }));
  const categoryMap = categories.map((item: any) => ({
    url: `${process.env.NEXT_PUBLIC_URL}/praca-zdalna/${polishToEnglish(
      item.slug
    )}/${polishToEnglish(item.category)}`,
    lastModified: new Date().toISOString(),
  }));
  const jobsMap = jobsData.map((item: any) => ({
    url: `${process.env.NEXT_PUBLIC_URL}/praca-zdalna/${polishToEnglish(
      item.slug
    )}/${polishToEnglish(item.category)}/${polishToEnglish(item.title)}`,
    lastModified: new Date().toISOString(),
  }));
  return [
    {
      url: `${process.env.NEXT_PUBLIC_URL}`,
      lastModified: new Date().toISOString(),
    },
    ...slugsMap,
    ...categoryMap,
    ...jobsMap,
  ];
}
