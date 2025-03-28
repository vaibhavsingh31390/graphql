"use client";
import { login } from "@/actions/Post";
import FormSubmitBtn from "@/components/ui/functional/FormSubmitBtn";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
export default function clientLoginForm() {
  const [state, formAction] = React.useActionState(login, {
    errors: {},
    success: false,
    data: {},
  });

  if (state.success) {
    setTimeout(() => {
      redirect("/");
    }, 2000);
  }

  return (
    <>
      {state.success && (
        <Link href={`/jobs/${state.data?.id}`}>
          <h1 className="bg-gray-600 mb-4 p-4 rounded shadow transition-all duration-300 hover:scale-[102%] scale-in">
            Welcome{" "}
            {state.data?.name?.charAt(0).toUpperCase() +
              state.data?.name?.slice(1).toLowerCase()}
            , redirecting you shortly...
          </h1>
        </Link>
      )}

      <form action={formAction}>
        <div className="form-input flex flex-col gap-1 mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            className="px-3 py-2 rounded text-black"
            defaultValue={`vaibhavsingh31390@gmail.com`}
            required
          />
          {state?.errors?.email && (
            <p className="text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div className="form-input flex flex-col gap-1 mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="px-3 py-2 rounded text-black"
            defaultValue={`test@1234`}
            required
          />
          {state?.errors?.password && (
            <p className="text-red-500">{state.errors.password}</p>
          )}
          {state?.errors?.status && (
            <p className="text-red-500">{state.errors.status}</p>
          )}
        </div>
        <FormSubmitBtn pendingText="Logging In..." idleText="Log In" />
      </form>
    </>
  );
}
