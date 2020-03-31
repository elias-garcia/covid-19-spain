import { connect } from "react-redux";

import ChoroplethWidget, {
  ChoroplethData,
  ChoroplethWidgetHandlerProps,
  ChoroplethWidgetStateProps,
  ChoroplethDataItem,
} from "./choropleth-widget";
import State from "../../../../../store/state";
import { Dispatch } from "react";
import {
  DashboardAction,
  changeChoroplethFilter,
} from "../../dashboard.actions";
import { ReportData, Field } from "../../../../../domain/report.interface";

const mapStateToData = ({
  dashboard: { reports, choroplethFilter },
}: State): ChoroplethData | undefined => {
  if (reports.step !== "successful") {
    return undefined;
  }

  return reports.result
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0]
    .data.map((reportData: ReportData) => {
      return {
        id: reportData.autonomousCommunity,
        value: reportData.values[choroplethFilter],
      };
    })
    .filter((data): data is ChoroplethDataItem => data.value !== null);
};

const mapStateToProps = (state: State): ChoroplethWidgetStateProps => ({
  data: mapStateToData(state),
  filterValue: state.dashboard.choroplethFilter,
});

const mapDispatchToProps = (
  dispatch: Dispatch<DashboardAction>
): ChoroplethWidgetHandlerProps => ({
  onFilterChange: (newValue: string) =>
    dispatch(changeChoroplethFilter(newValue as Field)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChoroplethWidget);
