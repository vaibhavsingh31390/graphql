import {
  fetchAllCompanyQl,
  fetchCompanyByIdQl,
  fetchJobsByCompanyByIdQl,
} from "../controller/companyController";
import {
  fetchUserByCompanyIdQl,
  fetchUserByIdQl,
} from "../controller/usersController";
import { GraphQlNotFoundCheck, toIsoDate } from "../lib/Helpers";
import { Job, User } from "../model";

export const companyResolvers = {
  company: async (_parent: any, args: { id: string }) => {
    const comapny = await fetchCompanyByIdQl(args.id);
    return GraphQlNotFoundCheck(comapny, `Comapny ID : ${args.id}`);
  },
  companys: async () => {
    const comapnys = await fetchAllCompanyQl();
    return GraphQlNotFoundCheck(comapnys, "Comapny's");
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
