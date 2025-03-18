import { getAllCompanys } from "@/lib/graphql/queries";
import Link from "next/link";

export default async function CompanyPage() {
  const companys = await getAllCompanys();

  if (typeof companys === "string" || companys.length === 0) {
    return <h1 className="text-center">No Company's found!!</h1>;
  }
  return (
    <>
      <h1 className="text-center text-3xl uppercase mb-4">Company's Board.</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {companys.map((company) => (
          <div
            key={company.id}
            className="card scale-95 p-3 bg-white rounded text-black shadow-md transition-transform duration-300 hover:scale-100"
          >
            <Link href={`/company/${company.id}`}>
              <div>
                <div className="text-3xl font-extrabold transition-all duration-300 hover:underline">
                  {company.name}
                </div>
                <div className="text-2xl font-bold mt-2 transition-all duration-300 hover:underline ">
                  {company.description}
                </div>
                <p className="bold mt-2 text-right font-bold">{company.date}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
