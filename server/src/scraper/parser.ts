import { ParsedReport } from "./parsed-report.interface";
import { AutonomousCommunityData } from "../shared/domain/autonomous-community-data.interface";

export { parseReport };

function parseNumericValue(value: string): number {
  return Number(value.replace(",", "."));
}

function normalizeAutonomousCommunityName(name: string): string {
  return name.normalize("NFD").replace(/[\u0300-\u036f|.]/, "");
}

function parseRowValues(values: number[]): AutonomousCommunityData["values"] {
  switch (values.length) {
    case 2: {
      return {
        casos: values[0],
        fallecidos: values[1]
      };
    }
    case 4: {
      return {
        casos: values[0],
        fallecidos: values[3]
      };
    }
    default: {
      throw new Error(
        "Parsing error. I can only parse tables with 2 or 4 columns"
      );
    }
  }
}

function parseTableFooter(tableFooter: string): ParsedReport["aggregates"] {
  const aggregates: number[] = tableFooter
    .split(" ")
    .map((value: string) => parseNumericValue(value))
    .filter((value: number) => Number.isNaN(value) === false);

  return parseRowValues(aggregates);
}

function parseTableRows(tableRows: string[]): AutonomousCommunityData[] {
  return tableRows.map((tableRow: string) => {
    const rowColumns: string[] = tableRow.split(" ");
    const [name, rowValues] = rowColumns.reduce<[string[], number[]]>(
      (acc: [string[], number[]], currentValue: string) => {
        const [totalName, totalRowValues] = acc;
        const parsedValue = parseNumericValue(currentValue);

        return Number.isNaN(parsedValue)
          ? [[...totalName, currentValue], totalRowValues]
          : [totalName, [...totalRowValues, parsedValue]];
      },
      [[], []]
    );

    return {
      autonomousCommunity: normalizeAutonomousCommunityName(name.join("-")),
      values: parseRowValues(rowValues)
    };
  });
}

function parseTable(text: string): string[] {
  const temp: string[] = text
    .slice(text.indexOf("CCAA"), text.length)
    .split(/\n/);

  const temp2: string[] = temp.slice(0, temp.indexOf(" "));
  const temp3: string[] = temp2.map(row => row.toLowerCase().trim());

  return temp3;
}

function parseDate(text: string): Date {
  const regExpMatch: RegExpMatchArray | null = text.match(
    /[0-9]{1,2}.[0-9]{1,2}.[0-9]{4}/
  );

  if (regExpMatch === null) {
    throw new Error("Error parsing the date of the report");
  }

  const [day, month, year] = regExpMatch[0]
    .split(".")
    .map(value => Number(value));

  return new Date(year, month - 1, day);
}

function parseReport(text: string): ParsedReport {
  const parsedDate: Date = parseDate(text);
  const tableRows: string[] = parseTable(text);
  const parsedAggregates: ParsedReport["aggregates"] = parseTableFooter(
    tableRows[tableRows.length - 1]
  );
  const parsedAutonomousCommunitiesData: AutonomousCommunityData[] = parseTableRows(
    tableRows.slice(1, tableRows.length - 1)
  );

  return {
    timestamp: parsedDate,
    autonomousCommunitiesData: parsedAutonomousCommunitiesData,
    aggregates: parsedAggregates
  };
}
