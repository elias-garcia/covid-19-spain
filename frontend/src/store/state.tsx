import { RouterState } from "connected-react-router";

import { AppState } from "../components/app/app.reducer";
import { DashboardState } from "../components/routes/dashboard/dashboard.reducer";

interface State {
  readonly app: AppState;
  readonly dashboard: DashboardState;
  readonly router: RouterState;
}

export default State;
