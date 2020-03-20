export { ReportNotYetAvailable };

class ReportNotYetAvailable extends Error {
  constructor(reportIndex: number) {
    super(`The report number ${reportIndex} is not yet available`);
  }
}
