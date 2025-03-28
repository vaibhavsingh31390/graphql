import { Request } from "express";
import { fetchCompanyByIdQl } from "../controller/companyController";
import {
  createJob,
  deleteJob,
  fetchAllJobsQl,
  fetchJobByIdQl,
  fetchJobByUserIdQl,
  updateJob,
} from "../controller/jobsController";
import { fetchUserByIdQl } from "../controller/usersController";
import { getContext, toIsoDate } from "../lib/Helpers";
import { Company } from "../model";

export const jobResolvers = {
  job: async (_parent: any, args: { id: string }) => {
    const job = await fetchJobByIdQl(args.id);
    return job;
  },
  jobs: async () => {
    const jobs = await fetchAllJobsQl();
    return jobs;
  },
  jobsByUserId: async (_parent: any, { id }: { id: string }) => {
    const job = await fetchJobByUserIdQl(id);
    return job;
  },
};

export const jobMutation = {
  createJob: async (
    _parent: any,
    {
      input,
    }: { input: { title: string; description: string; companyId: string } },
    { req }: { req: Request }
  ) => {
    const { auth } = getContext(req, true);
    const job = await createJob(
      input.title,
      input.description,
      input.companyId,
      auth
    );
    return job;
  },
  deleteJob: async (_parent: any, { id }: { id: string }) => {
    const job = await deleteJob(id);
    return job;
  },
  updateJob: async (
    _parent: any,
    {
      id,
      input,
    }: {
      id: string;
      input: { title: string; description: string; companyId: string };
    },
    context: { req: Request }
  ) => {
    const { auth } = getContext(context.req, true);
    const job = await updateJob(id, input);
    return job;
  },
};
export const jobFieldsMod = {
  Job: {
    company: async (job: any): Promise<Company | null> => {
      return await fetchCompanyByIdQl(job.companyId);
    },
    user: async (job: any): Promise<Company | null> => {
      return await fetchUserByIdQl(job.userId);
    },
    date: (job: any) => toIsoDate(job.createdAt),
    showActions: (job: any, _args: any, context: { req: Request }) => {
      const { auth } = getContext(context.req, false);
      return auth?.userId === job.userId;
    },
  },
};
