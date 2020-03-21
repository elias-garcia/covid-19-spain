import { ParsedReport } from "../domain/parsed-report.interface";
import { AutonomousCommunityData } from "../../../shared/domain/autonomous-community-data.interface";
import { ParsingError } from "../domain/parsing.error";

export { parseReport };

function parseNumericValue(value: string): number {
  return Number(value.replace(".", "").replace(",", "."));
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
  switch (values.length) {
    case 2: {
      return {
        casos: values[0],
        fallecidos: values[1]
      };
    }
    case 3: {
      return {
        casos: values[0],
        fallecidos: values[2]
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
        `I can only parse tables with 4 columns. This has ${values.length}`
      );
    }
  }
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

function groupRowsData(tableData: string[]): string[] {
  const tableRows: string[] = [];
  let i = 0;

  while (i < tableData.length) {
    const value: string = tableData[i];

    if (Number.isNaN(parseNumericValue(value)) === true) {
      let missingValues: string = value;
      let j = i + 1;

      while (
        j < tableData.length &&
        Number.isNaN(parseNumericValue(tableData[j])) === true
      ) {
        missingValues += `-${tableData[j]}`;
        j++;
      }
      while (
        j < tableData.length &&
        Number.isNaN(parseNumericValue(tableData[j])) === false
      ) {
        missingValues += ` ${tableData[j]}`;
        j++;
      }
      i = j;
      tableRows.push(missingValues);
    } else {
      i++;
    }
  }

  return tableRows;
}

function parseTable(text: string): string[] {
  const lowerCaseText: string = normalizeString(text).toLowerCase();
  const textWithoutBeginning = lowerCaseText.slice(
    lowerCaseText.indexOf("andalucia"),
    text.length
  );
  const tableData = normalizeWhiteSpaces(textWithoutBeginning).split(" ");
  const groupedRowsData = groupRowsData(tableData);

  return groupRowsData(tableData).slice(
    0,
    groupedRowsData.findIndex((value: string) => value.includes("la-rioja")) + 1
  );
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
  const parsedAutonomousCommunitiesData: AutonomousCommunityData[] = parseTableRows(
    tableRows
  );

  return {
    timestamp: parsedDate,
    autonomousCommunitiesData: parsedAutonomousCommunitiesData
  };
}
