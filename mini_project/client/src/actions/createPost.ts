"use server";
import { createJob } from "@/lib/graphql/queries";
type PostState = {
  errors?: Record<string, string>;
  data?: any;
  success?: boolean;
};
export async function createPost(
  state: PostState,
  formData: FormData
): Promise<PostState> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const errors: Record<string, string> = {};
  if (!title || title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters long.";
  }
  if (!description || description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters long.";
  }
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }
  const job = await createJob(title, description, "2");
  if (typeof job === "string") {
    errors.status = job;
    return { success: false, errors };
  }
  return { success: true, data: job };
}
