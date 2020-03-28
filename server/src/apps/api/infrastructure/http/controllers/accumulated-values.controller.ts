import { Request, Response, NextFunction } from "express";

import { HttpOkResponse } from "../http-responses";
import { getAccumulatedValues } from "../../../application/accumulated-values/get-accumulated-values";
import { accumulatedValuesDocToDto } from "../../dtos/accumulated-values.dto-converter";
import { AccumulatedValues } from "../../../../../shared/domain/accumulated-values.interface";

export { getAll };

async function getAll(
  _request: Request,
  response: Response<HttpOkResponse<AccumulatedValues>>,
  next: NextFunction
): Promise<Response<HttpOkResponse<AccumulatedValues>> | void> {
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
