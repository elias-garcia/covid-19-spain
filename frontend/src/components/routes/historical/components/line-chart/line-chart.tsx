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
          margin={{ top: 5, right: 160, bottom: 80, left: 40 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
          }}
          xFormat={(value) => new Date(value).toLocaleDateString()}
          yFormat={(value) => Number(value).toLocaleString()}
          curve="natural"
          axisBottom={{
            orient: "bottom",
            format: (value) => new Date(value).toLocaleDateString(),
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -60,
            legendOffset: 50,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            format: ".2s",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -50,
            legendPosition: "middle",
          }}
          colors={{ scheme: "category10" }}
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
            },
          ]}
        />
      </div>
    </WidgetCard>
  );
};

export default LineChart;
