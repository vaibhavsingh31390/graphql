import Link from "next/link";

export default async function Home() {
  return (
    <>
      <h1 className="text-center text-3xl uppercase mb-4">
        Welcome to job portal.
      </h1>

      <header>
        <div className="links flex justify-center items-center gap-4 mt-4">
          <Link
            className="bg-white text-black px-4 py-2 rounded transition-opacity opacity-100 duration-300 hover:opacity-80"
            href="/jobs"
          >
            Browse Jobs
          </Link>
          <Link
            className="bg-white text-black px-4 py-2 rounded transition-opacity opacity-100 duration-300 hover:opacity-80"
            href="/company"
          >
            Browse Company's
          </Link>
          <Link
            className="bg-white text-black px-4 py-2 rounded transition-opacity opacity-100 duration-300 hover:opacity-80"
            href="/post"
          >
            Post Job
          </Link>
        </div>
      </header>
    </>
  );
}
