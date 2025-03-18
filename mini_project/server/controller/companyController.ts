import { NextFunction, Request, Response } from "express";
import AppResponse from "../lib/AppResponse";
import { catchAsync } from "../lib/CatchAsync";
import { AppError } from "../lib/AppError";
import { Company, Job } from "../model";

export const fetchAllCompanyRest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const companies = await Company.findAll();

    if (!companies || companies.length === 0) {
      return next(new AppError(404, "Companies not found."));
    }

    return AppResponse.success(
      res,
      "Companies fetched successfully",
      companies
    );
  }
);

export const fetchAllCompanyQl = async (): Promise<Company[] | null> => {
  return await Company.findAll();
};

export const fetchCompanyByIdQl = async (
  id: string | number
): Promise<Company | null> => {
  return await Company.findByPk(id);
};

export const fetchJobsByCompanyByIdQl = async (
  id: string | number
): Promise<Job[] | null> => {
  return await Job.findAll({
    where: {
      companyId: id,
    },
  });
};
