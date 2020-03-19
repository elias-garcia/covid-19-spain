export { UnexpectedNumberOfScraperConfigsFoundError };

class UnexpectedNumberOfScraperConfigsFoundError extends Error {
  constructor(readonly scraperConfigsFound: number) {
    super(
      `I expect to found one ScraperConfig, but I found ${scraperConfigsFound}`
    );
  }
}
