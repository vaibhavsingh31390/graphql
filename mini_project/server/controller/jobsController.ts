import { NextFunction, Request, Response } from "express";
import AppResponse from "../lib/AppResponse";
import { catchAsync, catchAsyncGQl } from "../lib/CatchAsync";
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

export const fetchAllJobsQl = catchAsyncGQl(async (): Promise<Job[] | null> => {
  const jobs = await Job.findAll();
  return jobs;
});

export const fetchJobByIdQl = catchAsyncGQl(
  async (id: string | number): Promise<Job | null> => {
    const job = await Job.findByPk(id);
    return job;
  }
);

export const fetchJobByUserIdQl = catchAsyncGQl(
  async (id: string | number): Promise<Job[] | null> => {
    const job = await Job.findAll({
      where: {
        userId: id,
      },
    });
    return job;
  }
);

export const createJob = catchAsyncGQl(
  async (
    title: string,
    description: string,
    companyId: string,
    auth
  ): Promise<Job | null> => {
    const job = await Job.create({
      title,
      description,
      companyId,
      userId: auth.userId,
    });
    return job;
  }
);

export const deleteJob = catchAsyncGQl(
  async (id: string): Promise<Job | Error | null> => {
    const job = await Job.findByPk(id);
    if (!job) return new Error(`Job:${id} not found`);
    await job.destroy();
    return job;
  }
);

export const updateJob = catchAsyncGQl(
  async (
    id: string,
    updates: Partial<{ title: string; description: string; companyId: string }>
  ): Promise<Job | Error | null> => {
    const job = await Job.findByPk(id);
    if (!job) return new Error(`Job:${id} not found`);
    await job.update(updates);
    return job;
  }
);
