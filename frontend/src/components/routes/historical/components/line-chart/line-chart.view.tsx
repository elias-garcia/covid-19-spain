import React from "react";
import { ResponsiveLine, Serie, LineSvgProps, Line } from "@nivo/line";
import WidgetCard from "../../../../shared/widget-card/widget-card.view";
import useStyles from "./line-chart.styles";
import useNivoTheme from "../../../../../styles/nivo-theme";
import { useTheme, useMediaQuery } from "@material-ui/core";

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
  const matchesUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  if (!data) {
    return <></>;
  }

  const responsiveLineChartProps: LineSvgProps = {
    theme: nivoTheme,
    data,
    margin: { top: 45, right: 10, bottom: 70, left: 40 },
    xScale: {
      type: "point",
    },
    yScale: {
      type: "linear",
      min: "auto",
      max: "auto",
    },
    xFormat: (value) => new Date(value).toLocaleDateString(),
    yFormat: (value) => Number(value).toLocaleString(),
    curve: "natural",
    axisBottom: {
      orient: "bottom",
      format: (value) => new Date(value).toLocaleDateString(),
      tickSize: 5,
      tickPadding: 5,
      tickRotation: -60,
      legendOffset: 50,
      legendPosition: "middle",
    },
    axisLeft: {
      orient: "left",
      format: ".2s",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendOffset: -50,
      legendPosition: "middle",
    },
    colors: { scheme: "nivo" },
    useMesh: true,
    legends: [
      {
        anchor: "top",
        direction: "row",
        translateY: -40,
        itemsSpacing: 8,
        itemDirection: "left-to-right",
        itemWidth: 140,
        itemHeight: 20,
        symbolSize: 16,
        itemTextColor: theme.palette.text.primary,
      },
    ],
  };

  return (
    <WidgetCard title={title}>
      <div className={classes.root}>
        {matchesUpLg ? (
          <ResponsiveLine {...responsiveLineChartProps} />
        ) : (
          <Line {...responsiveLineChartProps} width={1200} height={300} />
        )}
      </div>
    </WidgetCard>
  );
};

export default LineChart;
