import { getJobsByUserId } from "@/lib/graphql/queries";
import { isAuthenticated } from "@/lib/helpers";
import Link from "next/link";

export default async function MyJobsPage() {
  const auth = await isAuthenticated();
  const jobs = await getJobsByUserId(auth?.userId?.toString() ?? "");

  if (typeof jobs === "string" || jobs.length === 0) {
    return <h1 className="text-center">No Jobs found!!</h1>;
  }

  return (
    <>
      <h1 className="text-center text-3xl uppercase mb-4">My Jobs Board.</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <Link href={`/jobs/${job.id}`} key={job.id}>
            <div className="card scale-95 p-3 bg-white rounded text-black shadow-md transition-transform duration-300 hover:scale-100">
              <div>
                <div className="text-3xl font-extrabold transition-all duration-300 underline">
                  {job.title}
                </div>
                <div className="text-2xl font-bold mt-2">
                  {job.company.name}
                </div>
                <p className="bold mt-2 text-right font-bold">{job.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
