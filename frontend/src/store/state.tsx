import { RouterState } from "connected-react-router";

import { AppState } from "../components/app/app.reducer";
import { DashboardState } from "../components/routes/dashboard/dashboard.reducer";
import { HistoricalState } from "../components/routes/historical/historical.reducer";

interface State {
  readonly app: AppState;
  readonly dashboard: DashboardState;
  readonly router: RouterState;
  readonly historical: HistoricalState;
}

export default State;
