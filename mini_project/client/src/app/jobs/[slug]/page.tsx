import { getJobsById } from "@/lib/graphql/queries";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobsById(slug);
  if (typeof job === "string") {
    return <h1 className="text-center">{job}</h1>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-center text-4xl font-bold uppercase mb-6">
        Job Details
      </h1>
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="font-bold text-black text-3xl">{job.title}</h2>
        <Link href={`/company/${job.company.id}`}>
          <p className="text-2xl text-gray-700 font-semibold mt-2 hover:underline">
            {job.company.name}
          </p>
        </Link>
        <p className="text-md text-black mt-1">{job.description}</p>
        <hr className="mt-2" />
        <div className="mt-4">
          <h3 className="text-black text-lg font-semibold">
            Company Description:
          </h3>
          <p className="text-sm text-gray-600">{job.company.description}</p>
        </div>
      </div>
    </div>
  );
}
