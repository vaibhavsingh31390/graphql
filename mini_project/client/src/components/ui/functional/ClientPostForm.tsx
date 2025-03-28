"use client";
import { createPost, updatePost } from "@/actions/Post";
import Link from "next/link";
import React from "react";
import FormSubmitBtn from "./FormSubmitBtn";
import { Job } from "@/lib/graphql/queries";

export default function ClientPostForm({
  companys,
  create,
  job,
}: {
  companys: any;
  create: boolean;
  job?: Job;
}) {
  const [state, formAction] = React.useActionState(
    create ? createPost : updatePost,
    {
      errors: {},
      success: false,
      data: {},
    }
  );

  const selectRef = React.useRef<HTMLSelectElement>(null);

  React.useEffect(() => {
    if (selectRef.current && job?.company.id) {
      selectRef.current.value = job.company.id;
    }
  }, [job?.company.id]);

  return (
    <>
      {state.success && (
        <Link href={`/jobs/${state.data?.id}`}>
          <h1 className="bg-gray-600 mb-4 p-4 rounded shadow transition-all duration-300 hover:scale-[102%] scale-in">
            Job {create ? "created" : "updated"}
          </h1>
        </Link>
      )}

      <form action={formAction} key={job?.id || "create"}>
        <div className="form-input flex flex-col gap-1 mb-3">
          <label htmlFor="title">Title</label>
          <input type="hidden" name="id" defaultValue={job?.id} />
          <input
            type="text"
            name="title"
            className="px-3 py-2 rounded text-black"
            required
            defaultValue={job?.title}
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
            defaultValue={job?.description}
          ></textarea>
          {state?.errors?.description && (
            <p className="text-red-500">{state.errors.description}</p>
          )}
          {state?.errors?.status && (
            <p className="text-red-500">{state.errors.status}</p>
          )}
        </div>

        <div className="form-input flex flex-col gap-1 mb-5">
          <label htmlFor="company">Company</label>
          <select
            ref={selectRef}
            name="company"
            className="px-3 py-2 rounded text-black"
            required
            defaultValue={job?.company.id}
          >
            <option value="">Select Company</option>
            {companys.map((company: any) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <FormSubmitBtn />
      </form>
    </>
  );
}
