import { Request, Response, NextFunction } from "express";

import { HttpOkResponse } from "../http-responses";
import { Report } from "../../../../../shared/infrastructure/database/interfaces/report.interface";
import { getAllReports } from "../../../application/reports/get-all-reports";
import { reportDocsToDtos } from "../../dtos/report.dto-converter";

export { getAll };

async function getAll(
  _request: Request,
  response: Response<HttpOkResponse<Report[]>>,
  next: NextFunction
): Promise<Response<HttpOkResponse<Report[]>> | void> {
  try {
    const reportsDocs = await getAllReports();
    const reportsDtos = reportDocsToDtos(reportsDocs);

    return response.status(200).json({ data: reportsDtos });
  } catch (error) {
    next(error);
  }
}
