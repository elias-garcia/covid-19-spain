import { Request, Response, NextFunction } from "express";

import { HttpOkResponse } from "../http-responses";
import { Report } from "../../../../../shared/domain/report.interface";
import { getAllReports } from "../../../application/reports/get-all-reports";
import { reportDocsToDtos } from "../../dtos/report.dto-converter";
import { validateOne } from "../../../../../shared/infrastructure/validation";
import { reportsFiltersValidationSchema } from "../validation/reports-filters.validation-schema";

export { getAll };

async function getAll(
  request: Request,
  response: Response<HttpOkResponse<Report[]>>,
  next: NextFunction
): Promise<Response<HttpOkResponse<Report[]>> | void> {
  try {
    const filters = validateOne(request.query, reportsFiltersValidationSchema);
    const reportsDocs = await getAllReports(filters);
    const reportsDtos = reportDocsToDtos(reportsDocs);

    return response.status(200).json({ data: reportsDtos });
  } catch (error) {
    next(error);
  }
}
