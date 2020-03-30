import { useTheme, useMediaQuery } from "@material-ui/core";

const useChoroplethLegends = (): {}[] => {
  const theme = useTheme();
  const matchesOnlyXs = useMediaQuery(theme.breakpoints.only("xs"));

  return matchesOnlyXs
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
};

export default useChoroplethLegends;
