import React from "react";
import { useTheme } from "@material-ui/core";
import { ResponsiveChoropleth } from "@nivo/geo";

import autonomousCommunitiesGeoData from "../../../../../data/autonomous-communities.json";
import useStyles from "./choropleth-widget.styles";
import useNivoTheme from "../../../../../styles/nivo-theme";

import WidgetCard from "../../../../shared/widget-card/widget-card";
import { FilterOption } from "../../../../shared/widget-card/components/widget-card-title-with-inline-filter/widget-card-title-with-inline-filter";
import { Field } from "../../../../../domain/report.interface";
import useChoroplethProjectionData from "./hooks/use-choropleth-projection-data";
import useChoroplethLegends from "./hooks/use-choropleth-legends";

export interface ChoroplethDataItem {
  readonly id: string;
  readonly value: number;
}

export type ChoroplethData = ChoroplethDataItem[];

export interface ChoroplethWidgetStateProps {
  readonly data: ChoroplethData | undefined;
  readonly filterValue: string;
}

export interface ChoroplethWidgetHandlerProps {
  readonly onFilterChange: (newValue: string) => void;
}

type ChoroplethWidgetProps = ChoroplethWidgetStateProps &
  ChoroplethWidgetHandlerProps;

const getSelectOptions = (): FilterOption[] => {
  const filterOptions: Field[] = [
    "cases",
    "deaths",
    "hospitalized",
    "icu",
    "recovered",
  ];

  return filterOptions.map((option) => ({
    label: `${option.charAt(0).toUpperCase()}${option.slice(1)}`,
    value: option,
  }));
};

const getDomain = (data: ChoroplethData): [number, number] => {
  return data.reduce(
    (acc, item) => {
      const minValue = item.value < acc[0] ? item.value : acc[0];
      const maxValue = item.value > acc[1] ? item.value : acc[1];

      return [minValue, maxValue];
    },
    [data[0].value, data[0].value]
  );
};

const ChoroplethWidget: React.FC<ChoroplethWidgetProps> = ({
  data,
  filterValue,
  onFilterChange,
}) => {
  const theme = useTheme();
  const nivoTheme = useNivoTheme(theme);
  const classes = useStyles();
  const projectionData = useChoroplethProjectionData();
  const filterOptions: FilterOption[] = getSelectOptions();
  const legends = useChoroplethLegends();

  if (!data) {
    return <></>;
  }

  const domain = getDomain(data);

  return (
    <WidgetCard
      title={{
        filterOptions,
        filterValue,
        rightTitle: "by autonomous community",
      }}
      onFilterChange={onFilterChange}
    >
      <div className={classes.root}>
        <ResponsiveChoropleth
          theme={nivoTheme}
          data={data}
          features={autonomousCommunitiesGeoData.features}
          colors="spectral"
          domain={domain}
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
    </WidgetCard>
  );
};

export default ChoroplethWidget;
