import { fetchCompanyByIdQl } from "../controller/companyController";
import {
  createJob,
  fetchAllJobsQl,
  fetchJobByIdQl,
} from "../controller/jobsController";
import { fetchUserByIdQl } from "../controller/usersController";
import { GraphQlNotFoundCheck, toIsoDate } from "../lib/Helpers";
import { Company } from "../model";

export const jobResolvers = {
  job: async (_parent: any, args: { id: string }) => {
    const job = await fetchJobByIdQl(args.id);
    return GraphQlNotFoundCheck(job, `Job ID : ${args.id}`);
  },
  jobs: async () => {
    const jobs = await fetchAllJobsQl();
    return GraphQlNotFoundCheck(jobs, "Jobs");
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
