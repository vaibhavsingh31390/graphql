import { isAuthenticated } from "@/lib/helpers";
import Link from "next/link";

export default async function Home() {
  const auth = await isAuthenticated();
  const commonClass =
    "bg-white text-black px-4 py-2 rounded transition-opacity opacity-100 duration-300 hover:opacity-80";

  const NavLinks = [
    { name: "Browse Jobs", href: "/jobs", auth: false },
    { name: "Browse Companies", href: "/company", auth: false },
    { name: "Login", href: "/login", auth: false, hideWhenAuth: true },
    { name: "Post Job", href: "/post", auth: true },
    { name: "My Jobs", href: "/my-jobs", auth: true },
  ];

  return (
    <>
      <h1 className="text-center text-3xl uppercase mb-4">
        Welcome to Job Portal
      </h1>

      <header>
        <div className="links flex justify-center items-center gap-4 mt-4">
          {NavLinks.filter((link) => !link.auth || auth?.auth)
            .filter((link) => !(auth?.auth && link.hideWhenAuth))
            .map(({ name, href }) => (
              <Link key={href} className={commonClass} href={href}>
                {name}
              </Link>
            ))}
        </div>
      </header>
    </>
  );
}
