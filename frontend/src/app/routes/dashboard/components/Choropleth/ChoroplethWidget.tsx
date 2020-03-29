import React from "react";
import { Card, CardContent, useTheme, useMediaQuery } from "@material-ui/core";
import { ResponsiveChoropleth } from "@nivo/geo";

import autonomousCommunitiesGeoData from "../../../../../data/autonomous-communities.json";
import useStyles from "./styles";
import useNivoTheme from "../../../../../styles/nivo-theme";

interface ChoroplethDataItem {
  id: string;
  value: number;
}

export type ChoroplethData = ChoroplethDataItem[];

export interface ChoroplethWidgetProps {
  readonly data: ChoroplethData | undefined;
}

const findMinAndMaxValues = (
  data: ChoroplethData
): { minValue: number; maxValue: number } => {
  return data.reduce(
    (acc, item) => {
      const minValue = item.value < acc.minValue ? item.value : acc.minValue;
      const maxValue = item.value > acc.maxValue ? item.value : acc.maxValue;

      return { minValue, maxValue };
    },
    { minValue: data[0].value, maxValue: data[0].value }
  );
};

const getProjectionData = (
  matchesUpSm: boolean,
  matchesUpMd: boolean,
  matchesUpLg: boolean,
  matchesUpXl: boolean
): { translation: [number, number]; scale: number } => {
  if (matchesUpXl) {
    return { translation: [0.6, 3.99], scale: 2800 };
  }
  if (matchesUpLg) {
    return { translation: [0.65, 3.99], scale: 2800 };
  }
  if (matchesUpMd) {
    return { translation: [0.71, 3.99], scale: 2800 };
  }
  if (matchesUpSm) {
    return { translation: [0.71, 3.5], scale: 1600 };
  }

  return { translation: [0.7, 3.66], scale: 1050 };
};

const ChoroplethWidget: React.FC<ChoroplethWidgetProps> = ({ data }) => {
  const theme = useTheme();
  const nivoTheme = useNivoTheme(theme);
  const classes = useStyles();
  const matchesOnlyXs = useMediaQuery(theme.breakpoints.only("xs"));
  const matchesUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchesUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const matchesUpXl = useMediaQuery(theme.breakpoints.up("xl"));

  if (!data) {
    return <></>;
  }

  const { minValue, maxValue } = findMinAndMaxValues(data);
  const projectionData = getProjectionData(
    matchesUpSm,
    matchesUpMd,
    matchesUpLg,
    matchesUpXl
  );
  const legends = matchesOnlyXs
    ? []
    : [
        {
          anchor: "left",
          direction: "column",
          itemWidth: 94,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemTextColor: theme.palette.text.primary,
          symbolSize: 20,
        },
      ];

  return (
    <Card>
      <CardContent>
        <div className={classes.root}>
          <ResponsiveChoropleth
            theme={nivoTheme}
            data={data}
            features={autonomousCommunitiesGeoData.features}
            colors="spectral"
            domain={[minValue, maxValue]}
            unknownColor={theme.palette.text.secondary}
            label="properties.name"
            valueFormat=".2s"
            projectionTranslation={projectionData.translation}
            projectionScale={projectionData.scale}
            borderWidth={1}
            borderColor={theme.palette.text.secondary}
            legends={legends}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChoroplethWidget;
