import { connect } from "react-redux";
import { Dispatch } from "redux";

import Historical, {
  HistoricalStateProps,
  HistoricalHandlerProps,
} from "./historical";
import State from "../../../store/state";
import { HistoricalAction, loadReports } from "./historical.actions";

const mapStateToProps = (state: State): HistoricalStateProps => ({
  areReportsLoading: state.historical.reports.step === "loading",
});

const mapDispatchToProps = (
  dispatch: Dispatch<HistoricalAction>
): HistoricalHandlerProps => ({
  onLoadReports: () => dispatch(loadReports()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Historical);