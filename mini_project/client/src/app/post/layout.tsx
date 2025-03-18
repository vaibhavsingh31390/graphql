import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Job Post | GraphQl Powered",
  description: "A job portal for best HRM and more..",
};

export default function Layout({
  serverPostForm,
  clientPostForm,
}: Readonly<{
  serverPostForm: React.ReactNode;
  clientPostForm: React.ReactNode;
}>) {
  return (
    <>
      {serverPostForm}
      {clientPostForm}
    </>
  );
}
