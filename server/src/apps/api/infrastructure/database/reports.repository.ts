import { MongooseFilterQuery } from "mongoose";

import { ReportsFilters } from "../../domain/reports-filters.interface";
import { MongoDoc } from "../../../../shared/infrastructure/database/interfaces/mongo-doc.type";
import { Report } from "../../../../shared/domain/report.interface";
import { ReportModel } from "../../../../shared/infrastructure/database/models/report.model";
import { AccumulatedValues } from "../../../../shared/domain/accumulated-values.interface";

export { getAll, getAccumulatedValues };

const DEFAULT_SORT_ORDER: Partial<Record<
  keyof Pick<Report, "timestamp">,
  "asc" | "desc"
>> = {
  timestamp: "asc"
};

function buildGetAllFiltersQuery(
  filters: Omit<ReportsFilters, "limit">
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

function buildGetAllSort(
  sortField: keyof Pick<Report, "timestamp"> | undefined,
  sortOrder: "asc" | "desc" | undefined
): Partial<Record<keyof Pick<Report, "timestamp">, "asc" | "desc">> {
  if (sortField === undefined || sortOrder === undefined) {
    return DEFAULT_SORT_ORDER;
  }

  return { [sortField]: sortOrder };
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
  const filtersQuery = buildGetAllFiltersQuery({
    to: filters.to,
    from: filters.from,
    autonomousCommunities: filters.autonomousCommunities
  });
  const sort = buildGetAllSort(filters.sortField, filters.sortOrder);
  const limit: number = filters.limit || 0;

  if (filters.autonomousCommunities === undefined) {
    return ReportModel.find(filtersQuery)
      .sort(sort)
      .limit(limit)
      .exec();
  }

  const aggregationPipeline = buildGetAllAggregationPipeline(
    filtersQuery,
    filters.autonomousCommunities
  );

  return ReportModel.aggregate(aggregationPipeline)
    .sort(sort)
    .limit(limit)
    .exec();
}

function buildGetAccumulatedValuesAggregationPipeline(): {}[] {
  return [
    { $sort: { timestamp: -1 } },
    { $limit: 2 },
    {
      $project: {
        casesSum: { $sum: "$data.values.cases" },
        deathsSum: { $sum: "$data.values.deaths" },
        hospitalizedSum: { $sum: "$data.values.hospitalized" },
        icuSum: { $sum: "$data.values.icu" },
        recoveredSum: { $sum: "$data.values.recovered" }
      }
    },
    {
      $group: {
        _id: null,
        groupedCases: { $first: "$casesSum" },
        casesElems: { $push: "$casesSum" },
        groupedDeaths: { $first: "$deathsSum" },
        deathsElems: { $push: "$deathsSum" },
        groupedHospitalized: { $first: "$hospitalizedSum" },
        hospitalizedElems: { $push: "$hospitalizedSum" },
        groupedIcu: { $first: "$icuSum" },
        icuElems: { $push: "$icuSum" },
        groupedRecovered: { $first: "$recoveredSum" },
        recoveredElems: { $push: "$recoveredSum" }
      }
    },
    {
      $project: {
        cases: {
          total: "$groupedCases",
          diffWithYesterday: {
            $subtract: [
              { $arrayElemAt: ["$casesElems", 0] },
              { $arrayElemAt: ["$casesElems", 1] }
            ]
          }
        },
        deaths: {
          total: "$groupedDeaths",
          diffWithYesterday: {
            $subtract: [
              { $arrayElemAt: ["$deathsElems", 0] },
              { $arrayElemAt: ["$deathsElems", 1] }
            ]
          }
        },
        hospitalized: {
          total: "$groupedHospitalized",
          diffWithYesterday: {
            $subtract: [
              { $arrayElemAt: ["$hospitalizedElems", 0] },
              { $arrayElemAt: ["$hospitalizedElems", 1] }
            ]
          }
        },
        icu: {
          total: "$groupedIcu",
          diffWithYesterday: {
            $subtract: [
              { $arrayElemAt: ["$icuElems", 0] },
              { $arrayElemAt: ["$icuElems", 1] }
            ]
          }
        },
        recovered: {
          total: "$groupedRecovered",
          diffWithYesterday: {
            $subtract: [
              { $arrayElemAt: ["$recoveredElems", 0] },
              { $arrayElemAt: ["$recoveredElems", 1] }
            ]
          }
        }
      }
    }
  ];
}

async function getAccumulatedValues(): Promise<MongoDoc<AccumulatedValues>> {
  const aggregationPipeline = buildGetAccumulatedValuesAggregationPipeline();
  const aggregationResults = await ReportModel.aggregate(
    aggregationPipeline
  ).exec();

  return aggregationResults[0];
}
