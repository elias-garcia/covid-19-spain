import { connect } from "react-redux";

import LineChart, {
  LineChartProps,
  LineChartData,
  LineChartDataItem,
} from "./line-chart";
import State from "../../../../../store/state";
import { Field } from "../../../../../domain/report.interface";

interface LineChartContainerProps {
  readonly field: Field;
}

const mapStateToData = (
  { historical: { reports, selectedAutonomousCommunities } }: State,
  field: Field
): LineChartProps["data"] => {
  if (reports.step !== "successful") {
    return undefined;
  }

  return selectedAutonomousCommunities.reduce<LineChartData>(
    (acc, autonomousCommunity) => {
      const data: LineChartDataItem["data"] = reports.result.map((report) => {
        const item = report.data.find(
          (value) => value.autonomousCommunity === autonomousCommunity
        );

        return {
          x: report.timestamp.split("T")[0],
          y: item === undefined ? null : item.values[field],
        };
      });

      return [...acc, { id: autonomousCommunity, data }];
    },
    []
  );
};

const mapStateToProps = (
  state: State,
  { field }: LineChartContainerProps
): LineChartProps => ({
  data: mapStateToData(state, field),
  title: field.charAt(0).toUpperCase() + field.slice(1),
});

export default connect(mapStateToProps)(LineChart);
