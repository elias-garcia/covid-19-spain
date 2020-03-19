import { httpClient, HttpStatusCode } from "../../shared/infrastructure/http";
import { ReportNotYetAvailable } from "../domain/report-not-yet-available.error";

export { getPdfReport };

const baseUrl = "https://www.mscbs.gob.es";
const urlPath =
  "profesionales/saludPublica/ccayes/alertasActual/nCov-China/documentos";
const pdfNamePrefix = "Actualizacion";
const possiblePdfNameSuffixes = ["COVID-19", "COVID", "COVID_1200"];

function getPossiblePdfNames(reportIndex: number): string[] {
  return possiblePdfNameSuffixes.map(
    (pdfNameSuffix: string) =>
      `${pdfNamePrefix}_${reportIndex}_${pdfNameSuffix}`
  );
}

function getPossibleUrls(reportIndex: number): string[] {
  return getPossiblePdfNames(reportIndex).map(
    (pdfName: string) => `${baseUrl}/${urlPath}/${pdfName}`
  );
}

async function getPdfReport(reportIndex: number): Promise<ArrayBuffer> {
  const possibleUrls: string[] = getPossibleUrls(reportIndex);

  for (const possibleUrl of possibleUrls) {
    const response = await httpClient.get<ArrayBuffer>(possibleUrl, {
      responseType: "arraybuffer"
    });

    if (response.status === HttpStatusCode.OK) {
      return response.data;
    }
  }

  throw new ReportNotYetAvailable(reportIndex);
}
