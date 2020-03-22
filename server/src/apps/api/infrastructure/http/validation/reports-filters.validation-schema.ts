import * as yup from "yup";
import { ReportsFilters } from "../../../domain/reports-filters.interface";

export { reportsFiltersValidationSchema };

const reportsFiltersValidationSchema: yup.Schema<ReportsFilters> = yup
  .object()
  .shape({
    autonomousCommunities: yup
      .array()
      .transform((_, originalValue) => {
        if (typeof originalValue === "string" && originalValue.includes(",")) {
          return originalValue.split(",");
        }

        return originalValue;
      })
      .of(yup.string()),
    from: yup.date(),
    to: yup.date()
  });
