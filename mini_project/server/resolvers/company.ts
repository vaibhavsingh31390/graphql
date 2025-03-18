import {
  createCompany,
  deleteCompany,
  fetchAllCompanyQl,
  fetchCompanyByIdQl,
  fetchJobsByCompanyByIdQl,
  updateCompany,
} from "../controller/companyController";
import { fetchUserByCompanyIdQl } from "../controller/usersController";
import { toIsoDate } from "../lib/Helpers";
import { Job, User } from "../model";

export const companyResolvers = {
  company: async (_parent: any, args: { id: string }) => {
    const comapny = await fetchCompanyByIdQl(args.id);
    return comapny;
  },
  companys: async () => {
    const comapnys = await fetchAllCompanyQl();
    return comapnys;
  },
};

export const comapnyMutation = {
  createCompany: async (
    _parent: any,
    { input }: { input: { name: string; description: string } }
  ) => {
    const company = await createCompany(input.name, input.description);
    return company;
  },
  deleteCompany: async (_parent: any, { id }: { id: string }) => {
    const company = await deleteCompany(id);
    return company;
  },
  updateCompany: async (
    _parent: any,
    {
      id,
      input,
    }: { id: string; input: { name?: string; description?: string } }
  ) => {
    const job = await updateCompany(id, input);
    return job;
  },
};

export const companyFieldsMod = {
  Company: {
    jobs: async (company: any): Promise<Job[] | null> => {
      return await fetchJobsByCompanyByIdQl(company.id);
    },
    users: async (job: any): Promise<User[] | null> => {
      return await fetchUserByCompanyIdQl(job.id);
    },
    date: (company: any) => toIsoDate(company.createdAt),
  },
};
