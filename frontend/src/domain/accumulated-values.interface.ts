import { Field } from "./report.interface";

type AccumulatedValues = {
  [key in Field]: {
    readonly total: number;
    readonly diffWithYesterday: number;
  };
};

export default AccumulatedValues;
