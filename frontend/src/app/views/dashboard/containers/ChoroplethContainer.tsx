import { connect } from "react-redux";

import Choropleth, {
  ChoroplethProps,
  ChoroplethData,
} from "../components/Choropleth/Choropleth";
import State from "../../../../store/state";
import Report from "../../../../shared/domain/report.interface";
import { AsyncTask } from "../../../../shared/interfaces/async-task";

const mapReportsToData = (
  reports: AsyncTask<Report[]>
): ChoroplethData | undefined => {
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

const mapStateToProps = (state: State): ChoroplethProps => ({
  data: mapReportsToData(state.dashboard.reports),
});

export default connect(mapStateToProps)(Choropleth);
