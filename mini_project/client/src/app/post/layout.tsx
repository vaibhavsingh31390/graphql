import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Job Post | GraphQl Powered",
  description: "A job portal for best HRM and more..",
};

export default function Layout({
  serverPostForm,
}: Readonly<{
  serverPostForm: React.ReactNode;
}>) {
  return <>{serverPostForm}</>;
}
