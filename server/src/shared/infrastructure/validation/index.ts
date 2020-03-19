import * as yup from "yup";

export { validate };

// tslint:disable-next-line: no-any
function validate<T>(raw: any, schema: yup.Schema<T>): T {
  return schema.validateSync(raw);
}
