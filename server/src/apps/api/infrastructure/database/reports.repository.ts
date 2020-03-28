import { MongooseFilterQuery } from "mongoose";

import { ReportsFilters } from "../../domain/reports-filters.interface";
import { MongoDoc } from "../../../../shared/infrastructure/database/interfaces/mongo-doc.type";
import { Report, ReportData } from "../../../../shared/domain/report.interface";
import { ReportModel } from "../../../../shared/infrastructure/database/models/report.model";

export { getAll, getAccumulatedValues };

const SORT_ORDER: Partial<Record<keyof Report, 1 | -1>> = { timestamp: 1 };

function buildGetAllFiltersQuery(
  filters: ReportsFilters
): MongooseFilterQuery<MongoDoc<Report>> {
  const timestampFilter = {
    ...(filters.from !== undefined || filters.to !== undefined
      ? {
          timestamp: {
            ...(filters.from !== undefined ? { $gte: filters.from } : {}),
            ...(filters.to !== undefined ? { $lte: filters.to } : {})
          }
        }
      : {})
  };

  return {
    ...timestampFilter
  };
}

function buildGetAllAggregationPipeline(
  filtersQuery: MongooseFilterQuery<MongoDoc<Report>>,
  autonomousCommunities: string[]
): {}[] {
  return [
    { $match: filtersQuery },
    {
      $project: {
        timestamp: 1,
        data: {
          $filter: {
            input: "$data",
            as: "dataItem",
            cond: {
              $in: ["$$dataItem.autonomousCommunity", autonomousCommunities]
            }
          }
        }
      }
    }
  ];
}

async function getAll(filters: ReportsFilters): Promise<MongoDoc<Report>[]> {
  const filtersQuery = buildGetAllFiltersQuery(filters);

  if (filters.autonomousCommunities === undefined) {
    return ReportModel.find(filtersQuery)
      .sort(SORT_ORDER)
      .exec();
  }

  const aggregationPipeline = buildGetAllAggregationPipeline(
    filtersQuery,
    filters.autonomousCommunities
  );

  return ReportModel.aggregate(aggregationPipeline)
    .sort(SORT_ORDER)
    .exec();
}

function buildGetAccumulatedValuesAggregationPipeline(): {}[] {
  return [
    { $sort: { timestamp: -1 } },
    { $limit: 1 },
    {
      $project: {
        cases: { $sum: "$data.values.cases" },
        deaths: { $sum: "$data.values.deaths" },
        hospitalized: { $sum: "$data.values.hospitalized" },
        icu: { $sum: "$data.values.icu" },
        recovered: { $sum: "$data.values.recovered" }
      }
    }
  ];
}

async function getAccumulatedValues(): Promise<MongoDoc<ReportData["values"]>> {
  const aggregationPipeline = buildGetAccumulatedValuesAggregationPipeline();
  const aggregationResults = await ReportModel.aggregate(
    aggregationPipeline
  ).exec();

  return aggregationResults[0];
}
