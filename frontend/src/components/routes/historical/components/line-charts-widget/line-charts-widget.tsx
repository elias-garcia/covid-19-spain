import React from "react";

import LineChartWidgetContainer from "../line-chart/line-chart.container";
import { Field } from "../../../../../domain/report.interface";
import useStyles from "./line-charts-widget.styles";

const LineChartsWidget: React.FC = () => {
  const classes = useStyles();
  const fields: Field[] = [
    "cases",
    "deaths",
    "hospitalized",
    "icu",
    "recovered",
  ];

  return (
    <>
      {fields.map((field) => (
        <div className={classes.lineChart}>
          <LineChartWidgetContainer field={field} />
        </div>
      ))}
    </>
  );
};

export default LineChartsWidget;
