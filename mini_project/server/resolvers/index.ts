import { companyFieldsMod, companyResolvers } from "./company";
import { jobFieldsMod, jobMutation, jobResolvers } from "./job";
import { userFieldsMod, userResolvers } from "./user";

const resolvers = {
  Query: {
    ...jobResolvers,
    ...companyResolvers,
    ...userResolvers,
  },
  Mutation: {
    ...jobMutation,
  },
  ...jobFieldsMod,
  ...companyFieldsMod,
  ...userFieldsMod,
};

export default resolvers;
