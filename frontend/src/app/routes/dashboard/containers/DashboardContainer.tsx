import { Dispatch } from "redux";
import { connect } from "react-redux";

import Dashboard, {
  DashboardStateProps,
  DashboardHandlerProps,
} from "../components/Dashboard/Dashboard";
import { loadData, DashboardAction } from "../store/dashboard.actions";
import State from "../../../../store/state";

const mapStateToProps = (state: State): DashboardStateProps => ({
  isInitialDataLoading:
    state.dashboard.reports.step === "loading" ||
    state.dashboard.accumulatedValues.step === "loading",
});

const mapDispatchToProps = (
  dispatch: Dispatch<DashboardAction>
): DashboardHandlerProps => ({
  onLoadData: () => dispatch(loadData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
