import { comapnyMutation, companyFieldsMod, companyResolvers } from "./company";
import { jobFieldsMod, jobMutation, jobResolvers } from "./job";
import { userFieldsMod, userMutation, userResolvers } from "./user";

const resolvers = {
  Query: {
    ...jobResolvers,
    ...companyResolvers,
    ...userResolvers,
  },
  Mutation: {
    ...jobMutation,
    ...userMutation,
    ...comapnyMutation,
  },
  ...jobFieldsMod,
  ...companyFieldsMod,
  ...userFieldsMod,
};

export default resolvers;
