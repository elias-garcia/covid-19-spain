import { Observable } from "rxjs";

import * as httpClient from "../utils/http-client";

const AUTONOMOUS_COMMUNITIES_API_URL = `${process.env.REACT_APP_API_URL}/autonomous-communities`;

export const fetchAutonomousCommunities = (): Observable<string[]> => {
  return httpClient.get<string[]>(AUTONOMOUS_COMMUNITIES_API_URL);
};
