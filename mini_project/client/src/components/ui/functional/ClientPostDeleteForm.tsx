"use client";
import React from "react";
import FormSubmitBtn from "./FormSubmitBtn";
import { deletePost } from "@/actions/Post";
import { redirect } from "next/navigation";

export default function ClientPostDeleteForm({ id }: { id: string }) {
  const [state, formAction] = React.useActionState(deletePost, {
    errors: {},
    success: false,
    data: {},
  });

  if (state.success) {
    setTimeout(() => {
      redirect("/jobs");
    }, 2000);
  }

  return (
    <>
      {state.success && (
        <h1 className="bg-gray-600 mb-4 p-4 rounded shadow transition-all duration-300 hover:scale-[102%] scale-in">
          Job Deleted.
        </h1>
      )}
      <form action={formAction}>
        <input type="hidden" name="id" defaultValue={id} />
        <FormSubmitBtn idleText="Delete" pendingText="Deleteing..." />
      </form>
    </>
  );
}
