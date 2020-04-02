import { connect } from "react-redux";

import AccumulatedValuesWidget, {
  AccumulatedValuesWidgetProps,
} from "./accumulated-values-widget.view";
import State from "../../../../../store/state";
import AccumulatedValues from "../../../../../domain/accumulated-values.interface";

const mapStateToAccumulatedValues = ({
  dashboard: { accumulatedValues },
}: State): AccumulatedValues | undefined => {
  if (accumulatedValues.step !== "successful") {
    return undefined;
  }

  return accumulatedValues.result;
};

const mapStateToProps = (state: State): AccumulatedValuesWidgetProps => ({
  accumulatedValues: mapStateToAccumulatedValues(state),
});

export default connect(mapStateToProps)(AccumulatedValuesWidget);
