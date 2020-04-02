import { Theme as NivoTheme } from "@nivo/core";
import { Theme } from "@material-ui/core";

const useNivoTheme = (theme: Theme): Partial<NivoTheme> => ({
  legends: {
    text: {
      font: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
    },
  },
  axis: {
    ticks: {
      text: {
        font: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize,
        fill: theme.palette.text.primary,
      },
    },
    legend: {
      text: {
        font: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize,
      },
    },
  },
  grid: {
    line: {
      stroke: theme.palette.text.secondary,
      strokeOpacity: 0.15,
    },
  },
  tooltip: {
    basic: {
      color: theme.palette.text.primary,
    },
    container: {
      background: theme.palette.background.default,
    },
  },
});

export default useNivoTheme;
