export { ReportsFilters };

interface ReportsFilters {
  readonly autonomousCommunities?: string[];
  readonly from?: Date;
  readonly to?: Date;
}
