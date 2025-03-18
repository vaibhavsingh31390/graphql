"use client";
import { createPost } from "@/actions/createPost";
import FormSubmitBtn from "@/components/ui/functional/FormSubmitBtn";
import Link from "next/link";
import React from "react";
export default function clientPostForm() {
  const [state, formAction] = React.useActionState(createPost, {
    errors: {},
    success: false,
    data: {},
  });

  return (
    <>
      {state.success && (
        <Link href={`/jobs/${state.data?.id}`}>
          <h1 className="bg-gray-600 mb-4 p-4 rounded shadow transition-all duration-300 hover:scale-[102%] scale-in">
            Job created ({state.data?.title})
          </h1>
        </Link>
      )}

      <form action={formAction}>
        <div className="form-input flex flex-col gap-1 mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="px-3 py-2 rounded text-black"
            required
          />
          {state?.errors?.title && (
            <p className="text-red-500">{state.errors.title}</p>
          )}
        </div>
        <div className="form-input flex flex-col gap-1 mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="px-3 py-2 rounded text-black"
            required
          ></textarea>
          {state?.errors?.description && (
            <p className="text-red-500">{state.errors.description}</p>
          )}

          {state?.errors?.status && (
            <p className="text-red-500">{state.errors.status}</p>
          )}
        </div>
        <FormSubmitBtn />
      </form>
    </>
  );
}
