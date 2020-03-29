import { AppState } from "../app/store/app.reducer";
import { DashboardState } from "../app/routes/dashboard/store/dashboard.reducer";

interface State {
  readonly app: AppState;
  readonly dashboard: DashboardState;
}

export default State;
