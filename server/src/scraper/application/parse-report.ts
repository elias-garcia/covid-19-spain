import { ParsedReport } from "../domain/parsed-report.interface";
import { AutonomousCommunityData } from "../../shared/domain/autonomous-community-data.interface";
import { ParsingError } from "../domain/parsing.error";

export { parseReport };

function parseNumericValue(value: string): number {
  return Number(value.replace(",", "."));
}

function normalizeString(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/, "");
}

function normalizeAutonomousCommunityName(name: string): string {
  return normalizeString(name).replace(".", "");
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
      throw new ParsingError(
        `I can only parse tables with 2 or 4 columns. This has ${values.length}`
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
  const temp2: string[] = temp.slice(0, temp.indexOf(" ")).map((row: string) =>
    normalizeString(row)
      .toLowerCase()
      .trim()
  );
  const temp3: string[] = temp2.slice(
    temp2.findIndex((value: string) => value.includes("andalucia")) - 1,
    temp2.length
  );

  return temp3;
}

function parseDate(text: string): string {
  const regExpMatch: RegExpMatchArray | null = text.match(
    /[0-9]{1,2}.[0-9]{1,2}.[0-9]{4}/
  );

  if (regExpMatch === null) {
    throw new ParsingError("I couldn't find the date in the report");
  }

  const [day, month, year] = regExpMatch[0]
    .split(".")
    .map(value => Number(value));

  return `${year}-${month}-${day}`;
}

function parseReport(text: string): ParsedReport {
  const parsedDate: string = parseDate(text);
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
