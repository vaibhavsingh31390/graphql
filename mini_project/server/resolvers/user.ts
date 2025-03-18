import { fetchCompanyByIdQl } from "../controller/companyController";
import { fetchJobByUserIdQl } from "../controller/jobsController";
import {
  fetchAllUsersQl,
  fetchUserByIdQl,
} from "../controller/usersController";
import { GraphQlNotFoundCheck, toIsoDate } from "../lib/Helpers";
import { Job, User } from "../model";

export const userResolvers = {
  user: async (_parent: any, args: { id: string }) => {
    const user = await fetchUserByIdQl(args.id);
    return GraphQlNotFoundCheck(user, `User ID : ${args.id}`);
  },
  users: async () => {
    const users = await fetchAllUsersQl();
    return GraphQlNotFoundCheck(users, "Users");
  },
};

// export const userMutation = {
//   createJob: async (
//     _parent: any,
//     { input }: { input: { title: string; description: string } }
//   ) => {
//     const companyId = "2";
//     const job = await createJob(input.title, input.description, companyId);
//     return job;
//   },
// };
export const userFieldsMod = {
  User: {
    company: async (user: any): Promise<User | null> => {
      return await fetchCompanyByIdQl(user.companyId);
    },
    jobs: async (user: any): Promise<Job[] | null> => {
      return await fetchJobByUserIdQl(user.id);
    },
    date: (job: any) => toIsoDate(job.createdAt),
  },
};
