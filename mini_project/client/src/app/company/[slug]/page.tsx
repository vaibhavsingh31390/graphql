import { getCompanyById } from "@/lib/graphql/queries";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = await getCompanyById(slug);
  if (typeof company === "string") {
    return (
      <h1 className="text-center text-2xl font-semibold mt-10">{company}</h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-center text-4xl font-bold uppercase mb-6">
        Company Details
      </h1>
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="font-bold text-black text-3xl">
          {company.name} ({company.date})
        </h2>
        <p className="text-md text-black mt-1">{company.description}</p>
        <hr className="mt-4 mb-4" />
        <h2 className="font-bold text-black text-xl mb-2">
          Jobs By <span className="underline">{company.name}</span>
        </h2>
        <ul className="text-white">
          {company.jobs.map((job) => {
            return (
              <div
                className="card bg-gray-600 mb-4 p-4 rounded shadow scale-100 transition-all duration-300 hover:scale-[102%]"
                key={job.id}
              >
                <Link href={`/jobs/${job.id}`}>
                  <li>
                    <h3 className="font-bold text-white text-md">
                      Title : {job.title}
                    </h3>
                    <p className="text-gray-100">
                      Job Description : {job.description}
                    </p>
                    <p>Date Posted : {job.date}</p>
                  </li>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
