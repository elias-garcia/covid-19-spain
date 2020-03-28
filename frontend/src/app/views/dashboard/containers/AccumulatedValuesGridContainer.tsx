import { connect } from "react-redux";

import AccumulatedValuesGrid, {
  AccumulatedValuesGridProps,
} from "../components/AccumulatedValuesGrid/AccumulatedValuesGrid";
import State from "../../../../store/state";

const mapStateToProps = (state: State): AccumulatedValuesGridProps => ({
  accumulatedValues: state.dashboard.accumulatedValues,
});

export default connect(mapStateToProps)(AccumulatedValuesGrid);
