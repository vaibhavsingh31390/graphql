import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(
  process.env.GQL_HOST || "http://localhost:5000/graphql"
);
interface Job {
  id: number;
  companyId?: number;
  title: string;
  description?: string;
  date: string;
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
  jobs: [
    {
      id: string;
      title?: string;
      date?: string;
      description?: string;
      createdAt?: Date;
      updatedAt?: Date;
    }
  ];
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
  try {
    const data = (await client.request<JobsResponse>(query)) || [];
    return data.jobs;
  } catch (error: any) {
    return error?.response?.errors[0].message || "Resource not found!";
  }
};

export const getJobsById = async (id: string): Promise<Job> => {
  const query = gql`
    query JobById($id: ID!) {
      job(id: $id) {
        id
        title
        description
        company {
          id
          name
          description
        }
      }
    }
  `;
  try {
    const data = (await client.request<JobResponse>(query, { id })) || [];
    return data.job;
  } catch (error: any) {
    return error?.response?.errors[0].message || "Resource not found!";
  }
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

  try {
    const data = (await client.request<CompanyResponse>(query, { id })) || [];
    return data.company;
  } catch (error: any) {
    return error?.response?.errors[0].message || "Resource not found!";
  }
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
  try {
    const data = (await client.request<CompanysResponse>(query)) || [];
    return data.companys;
  } catch (error: any) {
    return error?.response?.errors[0].message || "Resource not found!";
  }
};

// Mutation
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
  try {
    const data =
      (await client.request<JobResponse>(query, {
        input: {
          title,
          description: desc,
        },
      })) || [];
    return data.job;
  } catch (error: any) {
    return error?.response?.errors[0].message || "Resource not found!";
  }
};
