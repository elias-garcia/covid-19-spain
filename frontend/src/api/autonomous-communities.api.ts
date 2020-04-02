import { Observable } from "rxjs";

import * as httpClient from "../utils/http-client";
import { AutonomousCommunity } from "../domain/autonomous-community";

const AUTONOMOUS_COMMUNITIES_API_URL = `${process.env.REACT_APP_API_URL}/autonomous-communities`;

export const fetchAutonomousCommunities = (): Observable<
  AutonomousCommunity[]
> => {
  return httpClient.get<AutonomousCommunity[]>(AUTONOMOUS_COMMUNITIES_API_URL);
};
