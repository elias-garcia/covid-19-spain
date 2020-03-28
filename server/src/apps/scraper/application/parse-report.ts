import { ParsingError } from "../domain/parsing.error";
import { ReportData, Report } from "../../../shared/domain/report.interface";

export { parseReport };

function parseNumericValue(value: string): number {
  return Number(value.replace(".", "").replace(",", "."));
}

function normalizeString(value: string): string {
  return value.normalize("NFD").replace(/[^a-zA-Z0-9-.\s\n\r]/g, "");
}

function normalizeWhiteSpaces(value: string): string {
  return value.replace(/\s{2,}/g, " ");
}

function slugifyAutonomousCommunityName(name: string[]): string {
  return name.join("-").replace(".", "");
}

function parseRowValues(values: number[]): ReportData["values"] {
  switch (values.length) {
    case 2: {
      return {
        cases: values[0],
        deaths: values[1],
        hospitalized: null,
        icu: null,
        recovered: null
      };
    }
    case 3: {
      return {
        cases: values[0],
        deaths: values[2],
        hospitalized: null,
        icu: null,
        recovered: null
      };
    }
    case 4: {
      return {
        cases: values[0],
        deaths: values[3],
        hospitalized: null,
        icu: values[2],
        recovered: null
      };
    }
    case 6: {
      return {
        cases: values[0],
        deaths: values[4],
        hospitalized: values[2],
        icu: values[3],
        recovered: null
      };
    }
    case 7: {
      return {
        cases: values[0],
        deaths: values[4],
        hospitalized: values[2],
        icu: values[3],
        recovered: values[5]
      };
    }
    default: {
      throw new ParsingError(
        `I can only parse tables with 4 columns. This has ${values.length}`
      );
    }
  }
}

function parseTableRows(tableRows: string[]): ReportData[] {
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

function formatDayOrMonth(value: string): string {
  return value.length === 1 ? `0${value}` : value;
}

function formatYear(value: string): string {
  return value.length === 2 ? `20${value}` : value;
}

function parseDate(text: string): string {
  const regExpMatch: RegExpMatchArray | null = text.match(
    /[0-9]{1,2}.[0-9]{1,2}.[0-9]{2,4}/g
  );

  if (regExpMatch === null) {
    throw new ParsingError("I couldn't find the date in the report");
  }

  const [day, month, year] = regExpMatch[0].split(".");
  const formattedYear = formatYear(year);
  const formattedMonth = formatDayOrMonth(month);
  const formattedDay = formatDayOrMonth(day);

  return `${formattedYear}-${formattedMonth}-${formattedDay}T00:00:00Z`;
}

function parseReport(text: string): Report {
  const parsedDate: string = parseDate(text);
  const tableRows: string[] = parseTable(text);
  const parsedreportData: ReportData[] = parseTableRows(tableRows);

  return {
    timestamp: new Date(parsedDate),
    data: parsedreportData
  };
}
