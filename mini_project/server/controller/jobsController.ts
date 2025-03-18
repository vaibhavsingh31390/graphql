import { NextFunction, Request, Response } from "express";
import AppResponse from "../lib/AppResponse";
import { catchAsync } from "../lib/CatchAsync";
import { Job } from "../model";
import { AppError } from "../lib/AppError";

export const fetchAllJobsRest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const jobs = await Job.findAll();
    if (jobs) {
      next(new AppError(404, "Jobs not found."));
    }
    return AppResponse.success(res, "Jobs fetched successfully", jobs);
  }
);

export const fetchAllJobsQl = async (): Promise<Job[] | null> => {
  const jobs = await Job.findAll();
  return jobs;
};

export const fetchJobByIdQl = async (
  id: string | number
): Promise<Job | null> => {
  const job = await Job.findByPk(id);
  return job;
};

export const fetchJobByUserIdQl = async (
  id: string | number
): Promise<Job[] | null> => {
  const job = await Job.findAll({
    where: {
      userId: id,
    },
  });
  return job;
};

export const createJob = async (
  title: string,
  description: string,
  companyId: string
): Promise<Job | null> => {
  const job = await Job.create({
    title,
    description,
    companyId,
  });
  return job;
};
