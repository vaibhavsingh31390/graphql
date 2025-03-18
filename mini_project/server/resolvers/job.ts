import { fetchCompanyByIdQl } from "../controller/companyController";
import {
  createJob,
  deleteJob,
  fetchAllJobsQl,
  fetchJobByIdQl,
  updateJob,
} from "../controller/jobsController";
import { fetchUserByIdQl } from "../controller/usersController";
import { toIsoDate } from "../lib/Helpers";
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
};

export const jobMutation = {
  createJob: async (
    _parent: any,
    { input }: { input: { title: string; description: string } }
  ) => {
    const companyId = "2";
    const job = await createJob(input.title, input.description, companyId);
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
    }: { id: string; input: { title?: string; description?: string } }
  ) => {
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
  },
};
