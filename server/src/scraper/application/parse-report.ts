import { ParsedReport } from "../domain/parsed-report.interface";
import { AutonomousCommunityData } from "../../shared/domain/autonomous-community-data.interface";
import { ParsingError } from "../domain/parsing.error";

export { parseReport };

function parseNumericValue(value: string): number {
  return Number(value.replace(",", "."));
}

function normalizeString(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizeWhiteSpaces(value: string): string {
  return value.replace(/\s{2,}/g, " ");
}

function slugifyAutonomousCommunityName(name: string[]): string {
  return name.join("-").replace(".", "");
}

function parseRowValues(values: number[]): AutonomousCommunityData["values"] {
  if (values.length !== 4) {
    throw new ParsingError(
      `I can only parse tables with 4 columns. This has ${values.length}`
    );
  }

  return {
    casos: values[0],
    fallecidos: values[3]
  };
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
      autonomousCommunity: slugifyAutonomousCommunityName(name),
      values: parseRowValues(rowValues)
    };
  });
}

function fixMissingValues(tableRows: string[]): string[] {
  const fixedTableRows: string[] = [];
  let i = 0;

  while (i < tableRows.length) {
    const tableRow: string = tableRows[i];

    if (Number.isNaN(parseNumericValue(tableRow)) === true) {
      let missingValues: string = tableRow;
      let j = i + 1;

      while (
        j < tableRows.length &&
        Number.isNaN(parseNumericValue(tableRows[j])) === false
      ) {
        missingValues += ` ${tableRows[j]}`;
        j++;
      }
      i = j;
      fixedTableRows.push(missingValues);
    } else {
      i++;
    }
  }

  return fixedTableRows;
}

function parseTable(text: string): string[] {
  const temp: string[] = normalizeString(text)
    .toLowerCase()
    .split(/\n/)
    .filter((value: string) => value.trim() !== "")
    .map((value: string) => normalizeWhiteSpaces(value).trim());
  const temp2: string[] = temp.slice(
    temp.findIndex((value: string) => value.includes("ccaa")) + 1,
    temp.length
  );
  const temp3: string[] = temp2.slice(
    0,
    temp2.findIndex((value: string) => value.includes("total")) + 1
  );

  return fixMissingValues(temp3);
}

function formatDateMember(value: string): string {
  return value.length === 1 ? `0${value}` : value;
}

function parseDate(text: string): string {
  const regExpMatch: RegExpMatchArray | null = text.match(
    /[0-9]{1,2}.[0-9]{1,2}.[0-9]{4}/
  );

  if (regExpMatch === null) {
    throw new ParsingError("I couldn't find the date in the report");
  }

  const [day, month, year] = regExpMatch[0].split(".");

  return `${year}-${formatDateMember(month)}-${formatDateMember(
    day
  )}T00:00:00Z`;
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
