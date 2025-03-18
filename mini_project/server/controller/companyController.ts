import { NextFunction, Request, Response } from "express";
import AppResponse from "../lib/AppResponse";
import { catchAsync, catchAsyncGQl } from "../lib/CatchAsync";
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

export const fetchAllCompanyQl = catchAsyncGQl(
  async (): Promise<Company[] | null> => {
    return await Company.findAll();
  }
);

export const fetchCompanyByIdQl = catchAsyncGQl(
  async (id: string | number): Promise<Company | null> => {
    return await Company.findByPk(id);
  }
);

export const fetchJobsByCompanyByIdQl = catchAsyncGQl(
  async (id: string | number): Promise<Job[] | null> => {
    return await Job.findAll({
      where: {
        companyId: id,
      },
    });
  }
);

export const createCompany = catchAsyncGQl(
  async (name: string, description: string): Promise<Company | null> => {
    const company = await Company.create({
      name,
      description,
    });
    return company;
  }
);

export const deleteCompany = catchAsyncGQl(
  async (id: string): Promise<Company | Error | null> => {
    const company = await Company.findByPk(id);
    if (!company) return new Error(`company:${id} not found`);
    await company.destroy();
    return company;
  }
);

export const updateCompany = catchAsyncGQl(
  async (
    id: string,
    updates: Partial<{ title: string; description: string; companyId: string }>
  ): Promise<Company | Error | null> => {
    const company = await Company.findByPk(id);
    if (!company) return new Error(`Company:${id} not found`);
    await company.update(updates);
    return company;
  }
);
