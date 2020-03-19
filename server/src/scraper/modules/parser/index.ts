import { Field, AutonomousCommunityData, ParsedReport } from "./domain";

export { parseReport };

function processTable(text: string): string[] {
  const temp: string[] = text
    .slice(text.indexOf("CCAA"), text.length)
    .split(/\n/);

  const temp2: string[] = temp.slice(0, temp.indexOf(" "));
  const temp3: string[] = temp2.map(row => row.toLowerCase().trim());

  return temp3;
}

function parseHeader(tableHeader: string): Field[] {
  const headers: Field[] = ["casos", "ia", "uci", "fallecidos"];
  return tableHeader
    .split(" ")
    .reduce((columns: Field[], currentValue: string) => {
      return headers.includes(currentValue as Field)
        ? [...columns, currentValue as Field]
        : columns;
    }, []);
}

function parseNumericValue(value: string): number {
  return Number(value.replace(",", "."));
}

function parseFooter(
  tableFooter: string,
  fields: Field[]
): ParsedReport["aggregates"] {
  const footerColumns: string[] = tableFooter.split(" ");
  let aggregates: ParsedReport["aggregates"] = {};
  let i: number = footerColumns.length - 1;
  let nextFieldIndex: number = fields.length - 1;

  while (i >= footerColumns.length - fields.length) {
    aggregates = {
      ...aggregates,
      [fields[nextFieldIndex]]: parseNumericValue(footerColumns[i])
    };
    i--;
    nextFieldIndex--;
  }

  return aggregates;
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

function normalizeAutonomousCommunityName(name: string): string {
  return name.normalize("NFD").replace(/[\u0300-\u036f|.]/, "");
}

function parseRows(
  tableRows: string[],
  fields: Field[]
): AutonomousCommunityData[] {
  let autonomousCommunitiesData: AutonomousCommunityData[] = [];

  for (const tableRow of tableRows) {
    const rowColumns: string[] = tableRow.split(" ");
    let autonomousCommunityDataValues: AutonomousCommunityData["values"] = {};
    let autonomousCommunityName: string[] = [];
    let j: number = rowColumns.length - 1;
    let nextFieldIndex: number = fields.length - 1;

    while (j >= 0) {
      if (j >= rowColumns.length - fields.length) {
        autonomousCommunityDataValues = {
          ...autonomousCommunityDataValues,
          [fields[nextFieldIndex]]: parseNumericValue(rowColumns[j])
        };
      } else {
        autonomousCommunityName = [rowColumns[j], ...autonomousCommunityName];
      }
      j--;
      nextFieldIndex--;
    }

    autonomousCommunitiesData = [
      ...autonomousCommunitiesData,
      {
        name: normalizeAutonomousCommunityName(
          autonomousCommunityName.join("-")
        ),
        values: autonomousCommunityDataValues
      }
    ];
  }

  return autonomousCommunitiesData;
}

function parseReport(text: string): ParsedReport {
  const parsedDate: Date = parseDate(text);
  const tableRows: string[] = processTable(text);
  const fields: Field[] = parseHeader(tableRows[0]);
  const parsedAggregates: ParsedReport["aggregates"] = parseFooter(
    tableRows[tableRows.length - 1],
    fields
  );
  const parsedAutonomousCommunitiesData: AutonomousCommunityData[] = parseRows(
    tableRows.slice(1, tableRows.length - 1),
    fields
  );

  return {
    date: parsedDate,
    autonomousCommunitiesData: parsedAutonomousCommunitiesData,
    aggregates: parsedAggregates
  };
}
