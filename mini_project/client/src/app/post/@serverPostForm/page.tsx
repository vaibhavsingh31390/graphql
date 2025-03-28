import ClientPostForm from "@/components/ui/functional/ClientPostForm";
import { getCompanysList } from "@/lib/graphql/queries";
import React from "react";
export default async function serverPostForm() {
  const companys = await getCompanysList();
  return (
    <>
      <h1 className="text-center text-3xl uppercase mb-4">Post Job</h1>
      <ClientPostForm companys={companys} create={true} />
    </>
  );
}
