import { useMediaQuery, useTheme } from "@material-ui/core";

const useChoroplethProjectionData = (): {
  translation: [number, number];
  scale: number;
} => {
  const theme = useTheme();
  const matchesUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const matchesUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const matchesUpXl = useMediaQuery(theme.breakpoints.up("xl"));

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

export default useChoroplethProjectionData;
