import { GraphQLClient, gql } from "graphql-request";
import { cookies } from "next/headers";
import { COOKIE_OPTIONS, getAndSanitizeCookie } from "../helpers";
import { revalidatePath } from "next/cache";

const baseHeaders: Record<string, string> = {
  "Content-Type": "application/json",
  Origin: process.env.CLIENT_HOST || "http://localhost:3000",
};
const graphqlEndpoint = process.env.GQL_HOST || "http://localhost:5000/graphql";
const createClient = async () => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session-token")?.value;

  const headers = { ...baseHeaders };
  if (sessionToken) {
    headers.Authorization = `Bearer ${sessionToken}`;
  }

  return new GraphQLClient(graphqlEndpoint, {
    credentials: "include",
    headers,
  });
};

async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const client = await createClient();
  try {
    return await client.request<T>(query, variables);
  } catch (error: any) {
    throw new Error(
      error?.response?.errors[0]?.message || "Resource not found!"
    );
  }
}

// Interfaces
export interface Job {
  id: number;
  companyId?: number;
  userId: number;
  title: string;
  description?: string;
  date: string;
  showActions: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  company: {
    id: string;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
}

interface Company {
  id: number;
  name: string;
  description?: string;
  date: string;
  createdAt?: Date;
  updatedAt?: Date;
  jobs: Array<{
    id: string;
    title?: string;
    date?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }>;
}

interface User {
  id: number;
  companyId?: number;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  company?: {
    id?: string;
    name?: string;
    description?: string;
    date?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  jobs?: {
    id?: number;
    title?: string;
    description?: string;
    date?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
}

interface JobsResponse {
  jobs: Job[];
}

interface JobResponse {
  job: Job;
}

interface CompanysResponse {
  companys: Company[];
}

interface CompanyResponse {
  company: Company;
}

interface UserResponse {
  user: User;
}

// Query functions
export const getJobs = async (): Promise<Job[]> => {
  const query = gql`
    query {
      jobs {
        id
        title
        date
        company {
          id
          name
        }
      }
    }
  `;
  const data = await graphqlRequest<JobsResponse>(query);
  return data.jobs;
};

export const getJobsById = async (id: string): Promise<Job> => {
  const query = gql`
    query JobById($id: ID!) {
      job(id: $id) {
        id
        title
        description
        showActions
        userId
        company {
          id
          name
          description
        }
      }
    }
  `;
  const data = await graphqlRequest<JobResponse>(query, { id });
  return data.job;
};

export const getJobsByUserId = async (id: string): Promise<Job[]> => {
  const query = gql`
    query ($id: ID!) {
      jobs: jobsByUserId(id: $id) {
        id
        title
        description
        date
        company {
          name
        }
      }
    }
  `;
  const data = await graphqlRequest<JobsResponse>(query, { id });
  return data.jobs;
};

export const getCompanyById = async (id: string): Promise<Company> => {
  const query = gql`
    query getCompanyById($id: ID!) {
      company(id: $id) {
        id
        name
        description
        date
        createdAt
        updatedAt
        jobs {
          id
          title
          date
          description
        }
      }
    }
  `;
  const data = await graphqlRequest<CompanyResponse>(query, { id });
  return data.company;
};

export const getAllCompanys = async (): Promise<Company[]> => {
  const query = gql`
    query getAllCompany {
      companys {
        id
        name
        description
        date
        jobs {
          title
          description
        }
      }
    }
  `;
  const data = await graphqlRequest<CompanysResponse>(query);
  return data.companys;
};

export const getCompanysList = async (): Promise<Company[]> => {
  const query = gql`
    query getAllCompany {
      companys {
        id
        name
      }
    }
  `;
  const data = await graphqlRequest<CompanysResponse>(query);
  return data.companys;
};

// Mutation functions
export const createJob = async (
  title: string,
  desc: string,
  companyId: string
): Promise<Job> => {
  const query = gql`
    mutation createJobM($input: createJobInput!) {
      job: createJob(input: $input) {
        id
        title
        description
        date
      }
    }
  `;
  const client = await createClient();
  try {
    const response = await client.rawRequest(query, {
      input: {
        title,
        description: desc,
        companyId,
      },
    });
    return (response.data as any).job;
  } catch (error: any) {
    handleError(error);
  }
};

export const updateJob = async (
  id: string,
  title: string,
  desc: string,
  companyId: string
): Promise<Job> => {
  const query = gql`
    mutation ($id: ID!, $input: updateJobInput!) {
      updateJob(id: $id, input: $input) {
        id
        title
        description
        showActions
        userId
        company {
          id
          name
          description
        }
      }
    }
  `;
  const client = await createClient();
  try {
    const response = await client.rawRequest(query, {
      id,
      input: {
        title,
        description: desc,
        companyId,
      },
    });
    revalidatePath("/jobs", "page");
    return (response.data as any).job;
  } catch (error: any) {
    handleError(error);
  }
};

export const deleteJob = async (id: string): Promise<Job> => {
  const query = gql`
    mutation ($id: ID!) {
      deleteJob(id: $id) {
        id
        title
        description
        showActions
        userId
        company {
          id
          name
          description
        }
      }
    }
  `;
  const client = await createClient();
  try {
    const response = await client.rawRequest(query, {
      id,
    });
    return (response.data as any).job;
  } catch (error: any) {
    handleError(error);
  }
};

export const authlogin = async (
  email: string,
  password: string
): Promise<User> => {
  const query = gql`
    mutation loginUser($input: loginUserInput!) {
      user: loginUser(input: $input) {
        email
        name
        id
      }
    }
  `;
  const client = await createClient();
  try {
    const response = await client.rawRequest(query, {
      input: { email, password },
    });
    const sessionToken = getAndSanitizeCookie(
      response.headers.get("set-cookie")
    );

    if (sessionToken) {
      (await cookies()).set("session-token", sessionToken, COOKIE_OPTIONS);
    }
    return (response.data as any).user;
  } catch (error: any) {
    throw new Error(error?.response?.errors?.[0]?.message ?? "Login failed");
  }
};

function handleError(error: any): never {
  const errorMessage =
    error?.response?.errors?.[0]?.message ?? "An unexpected error occurred";
  console.error("GraphQL Error:", errorMessage);
  throw new Error(errorMessage);
}
