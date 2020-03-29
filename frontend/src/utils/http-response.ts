export interface HttpOkResponse<T> {
  readonly data: T;
}

export interface HttpErrorResponse {
  readonly message: string | string[];
}

type HttpResponse<T> = HttpOkResponse<T> | HttpErrorResponse;

export default HttpResponse;
