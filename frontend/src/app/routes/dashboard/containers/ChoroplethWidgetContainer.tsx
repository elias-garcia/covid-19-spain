import { connect } from "react-redux";

import ChoroplethWidget, {
  ChoroplethWidgetProps,
  ChoroplethData,
} from "../components/Choropleth/ChoroplethWidget";
import State from "../../../../store/state";

const mapStateToData = ({
  dashboard: { reports },
}: State): ChoroplethData | undefined => {
  if (reports.step !== "successful") {
    return undefined;
  }

  return reports.result
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0]
    .data.map((value) => ({
      id: value.autonomousCommunity,
      value: value.values.cases,
    }));
};

const mapStateToProps = (state: State): ChoroplethWidgetProps => ({
  data: mapStateToData(state),
});

export default connect(mapStateToProps)(ChoroplethWidget);
