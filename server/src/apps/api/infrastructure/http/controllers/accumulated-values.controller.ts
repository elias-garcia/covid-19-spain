import { Request, Response, NextFunction } from "express";

import { HttpOkResponse } from "../http-responses";
import { ReportData } from "../../../../../shared/domain/report.interface";
import { getAccumulatedValues } from "../../../application/accumulated-values/get-accumulated-values";
import { accumulatedValuesDocToDto } from "../../dtos/accumulated-values.dto-converter";

export { getAll };

async function getAll(
  _request: Request,
  response: Response<HttpOkResponse<ReportData["values"]>>,
  next: NextFunction
): Promise<Response<HttpOkResponse<ReportData["values"]>> | void> {
  try {
    const accumulatedValuesDoc = await getAccumulatedValues();
    const accumulatedValuesDto = accumulatedValuesDocToDto(
      accumulatedValuesDoc
    );
    return response.status(200).json({ data: accumulatedValuesDto });
  } catch (error) {
    next(error);
  }
}
