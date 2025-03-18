import React from "react";
export default function serverPostForm() {
  const company: number | string = 1;
  return (
    <>
      <h1 className="text-center text-3xl uppercase mb-4">
        Post Job for Company: {company}
      </h1>
    </>
  );
}
