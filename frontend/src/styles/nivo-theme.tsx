import { Theme as NivoTheme } from "@nivo/core";
import { Theme } from "@material-ui/core";

const useNivoTheme = (theme: Theme): Partial<NivoTheme> => ({
  legends: {
    text: {
      font: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
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
