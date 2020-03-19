import axios, { AxiosInstance } from "axios";
import { Agent } from "https";

export { httpClient, HttpStatusCode };

const httpsAgent: Agent = new Agent({ rejectUnauthorized: false });

const httpClient: AxiosInstance = axios.create({
  httpsAgent
});

enum HttpStatusCode {
  OK = 200
}
