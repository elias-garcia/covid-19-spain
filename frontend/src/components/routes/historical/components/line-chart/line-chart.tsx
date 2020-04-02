import React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import WidgetCard from "../../../../shared/widget-card/widget-card";
import useStyles from "./line-chart.styles";
import useNivoTheme from "../../../../../styles/nivo-theme";
import { useTheme } from "@material-ui/core";

export type LineChartDataItem = Serie;

export type LineChartData = LineChartDataItem[];

export interface LineChartProps {
  readonly data: LineChartData | undefined;
  readonly title: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  const classes = useStyles();
  const theme = useTheme();
  const nivoTheme = useNivoTheme(theme);

  if (!data) {
    return <></>;
  }

  return (
    <WidgetCard title={title}>
      <div className={classes.root}>
        <ResponsiveLine
          theme={nivoTheme}
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -56,
            legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          colors={{ scheme: "nivo" }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </WidgetCard>
  );
};

export default LineChart;
