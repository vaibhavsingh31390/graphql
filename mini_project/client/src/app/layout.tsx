import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Job Portal | GraphQl Powered",
  description: "A job portal for best HRM and more..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Link href={`/`}>
          <button className="bg-white opacity-100 absolute top-0 left-0 text-black px-4 py-2 transition-opacity duration-300 hover:opacity-90">
            Home
          </button>
        </Link>
        <section className="container mx-auto p-4">{children}</section>
      </body>
    </html>
  );
}
