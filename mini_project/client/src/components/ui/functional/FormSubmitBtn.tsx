"use client";
import { useFormStatus } from "react-dom";
export default function FormSubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-white opacity-100 text-black px-4 py-2 transition-opacity duration-300 hover:opacity-90"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
