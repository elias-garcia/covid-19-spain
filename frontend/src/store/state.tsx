import { AppState } from "../app/reducers/app.reducer";
import { DashboardState } from "../app/views/dashboard/reducers/dashboard.reducer";

interface State {
  readonly app: AppState;
  readonly dashboard: DashboardState;
}

export default State;
