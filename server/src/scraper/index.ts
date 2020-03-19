import * as pdfParse from "pdf-parse";

import { httpClient, HttpStatusCode } from "../shared/infrastructure/http";
import { ParsedReport } from "./domain/parsed-report.interface";
import { parseReport } from "./application/parse-report";

export { run };

const index = 39;
const url = `https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov-China/documentos/Actualizacion_${index}_COVID-19.pdf`;

async function run(): Promise<void> {
  const response = await httpClient.get(url, {
    responseType: "arraybuffer"
  });

  if (response.status === HttpStatusCode.NOT_FOUND) {
    throw new Error("The new report is not yet available");
  }

  if (response.status !== HttpStatusCode.OK) {
    throw new Error(
      `An unexpected error occurred fetching the new report: ${response.statusText}`
    );
  }

  const parsedPdf = await pdfParse(response.data);
  const parsedReport: ParsedReport = parseReport(parsedPdf.text);

  // tslint:disable-next-line: no-console
  console.log(parsedReport);
}
