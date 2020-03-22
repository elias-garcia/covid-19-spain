import { Request, Response, NextFunction } from "express";

import { HttpErrorResponse } from "../http/http-responses";

export { clientErrorHandler };

function clientErrorHandler(
  _request: Request,
  response: Response<HttpErrorResponse>,
  _next: NextFunction
): Response<HttpErrorResponse> {
  return response
    .status(404)
    .json({ message: "The requested resource does not exist" });
}
