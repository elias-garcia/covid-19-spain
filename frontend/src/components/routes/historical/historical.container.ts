import { connect } from "react-redux";
import { Dispatch } from "redux";

import Historical, {
  HistoricalStateProps,
  HistoricalHandlerProps,
} from "./historical";
import State from "../../../store/state";
import { HistoricalAction, loadData } from "./historical.actions";
import { abortDataLoading } from "../historical/historical.actions";

const mapStateToProps = (state: State): HistoricalStateProps => ({
  areReportsLoading: state.historical.reports.step === "loading",
});

const mapDispatchToProps = (
  dispatch: Dispatch<HistoricalAction>
): HistoricalHandlerProps => ({
  onLoadData: () => dispatch(loadData()),
  onAbortDataLoading: () => dispatch(abortDataLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Historical);
