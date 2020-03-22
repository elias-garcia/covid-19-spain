import { MongoDoc } from "../../../../shared/infrastructure/database/interfaces/mongo-doc.type";
import { Report } from "../../../../shared/domain/report.interface";
import { ReportModel } from "../../../../shared/infrastructure/database/models/report.model";
import { ReportsFilters } from "../../domain/reports-filters.interface";
import { MongooseFilterQuery } from "mongoose";

export { getAllReports };

function buildFiltersQuery(
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

async function getAllReports(
  filters: ReportsFilters
): Promise<MongoDoc<Report>[]> {
  const filtersQuery = buildFiltersQuery(filters);

  if (filters.autonomousCommunities === undefined) {
    return ReportModel.find(filtersQuery);
  }

  const aggregationPipeline = buildGetAllAggregationPipeline(
    filtersQuery,
    filters.autonomousCommunities
  );

  return ReportModel.aggregate(aggregationPipeline).exec();
}
