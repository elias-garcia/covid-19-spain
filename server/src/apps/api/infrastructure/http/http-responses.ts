export { HttpOkResponse, HttpErrorResponse };

interface HttpOkResponse<T> {
  readonly data: T;
}

interface HttpErrorResponse {
  readonly message: string | string[];
}
