import { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";

import { HttpErrorResponse } from "../http/http-responses";
import { logger } from "../../../../shared/infrastructure/logging";

export { unexpectedErrorHandler };

function unexpectedErrorHandler(
  error: Error,
  _request: Request,
  response: Response<HttpErrorResponse>,
  _next: NextFunction
): Response<HttpErrorResponse> {
  logger.error(`[API] ${error.message} - ${error.stack}`);
  if (error instanceof ValidationError) {
    return response.status(422).json({ message: error.errors });
  }

  return response.status(500).json({ message: "Unexpected error" });
}
