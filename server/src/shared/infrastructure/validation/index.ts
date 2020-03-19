import * as yup from "yup";

export { validateOne, validateMany };

// tslint:disable-next-line: no-any
function validateOne<T>(raw: any, schema: yup.Schema<T>): T {
  return schema.validateSync(raw);
}

// tslint:disable-next-line: no-any
function validateMany<T>(raw: any, schema: yup.Schema<T>): T[] {
  return yup.array(schema).validateSync(raw);
}
