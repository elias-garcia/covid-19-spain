import { Dispatch } from "redux";
import { connect } from "react-redux";

import Dashboard, {
  DashboardStateProps,
  DashboardHandlerProps,
} from "./dashboard.view";
import {
  loadData,
  DashboardAction,
  abortDataLoading,
} from "./dashboard.actions";
import State from "../../../store/state";

const mapStateToProps = (state: State): DashboardStateProps => ({
  isInitialDataLoading:
    state.dashboard.latestReport.step === "loading" ||
    state.dashboard.accumulatedValues.step === "loading",
});

const mapDispatchToProps = (
  dispatch: Dispatch<DashboardAction>
): DashboardHandlerProps => ({
  onLoadData: () => dispatch(loadData()),
  onAbortDataLoading: () => dispatch(abortDataLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
