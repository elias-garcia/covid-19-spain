export interface Config {
  readonly NODE_ENV: "development" | "production";
  readonly API_PORT: number;
  readonly MONGODB_URI: string;
}
