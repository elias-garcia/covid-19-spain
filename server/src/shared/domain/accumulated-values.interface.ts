import { Field } from "./report.interface";

export { AccumulatedValues };

type AccumulatedValues = {
  [key in Field]: {
    readonly total: number;
    readonly diffWithYesterday: number;
  };
};
