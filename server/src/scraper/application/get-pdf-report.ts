import { httpClient, HttpStatusCode } from "../../shared/infrastructure/http";
import { ReportNotYetAvailable } from "../domain/report-not-yet-available.error";
import { AxiosError } from "axios";
import { logger } from "../../shared/infrastructure/logging";

export { getPdfReport };

const baseUrl = "https://www.mscbs.gob.es";
const urlPath =
  "profesionales/saludPublica/ccayes/alertasActual/nCov-China/documentos";
const pdfNamePrefix = "Actualizacion";
const possiblePdfNameSuffixes = ["COVID-19", "COVID", "COVID_1200"];

function getPossiblePdfNames(reportIndex: number): string[] {
  return possiblePdfNameSuffixes.map(
    (pdfNameSuffix: string) =>
      `${pdfNamePrefix}_${reportIndex}_${pdfNameSuffix}.pdf`
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
    try {
      const response = await httpClient.get<ArrayBuffer>(possibleUrl, {
        responseType: "arraybuffer"
      });

      if (response.status === HttpStatusCode.OK) {
        return response.data;
      }
    } catch (error) {
      const { message } = error as AxiosError;
      logger.warn(`[SCRAPER] Fetching report... ERR - ${message}`);
    }
  }

  throw new ReportNotYetAvailable(reportIndex);
}
