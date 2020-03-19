export { MoreThanOneScraperConfigFoundError };

class MoreThanOneScraperConfigFoundError extends Error {
  constructor(docsFound: number) {
    super(`I expect to found one ScraperConfig, but I found ${docsFound}`);
  }
}
