"use client";

import { useFormStatus } from "react-dom";

interface FormSubmitBtnProps {
  pendingText?: string;
  idleText?: string;
}

export default function FormSubmitBtn({
  pendingText = "Submitting...",
  idleText = "Submit",
}: FormSubmitBtnProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-white opacity-100 text-black px-4 py-2 transition-opacity duration-300 hover:opacity-90 disabled:opacity-50"
      disabled={pending}
    >
      {pending ? pendingText : idleText}
    </button>
  );
}
