import { Theme, createMuiTheme } from "@material-ui/core";

const createMaterialTheme = (themeType: "light" | "dark"): Theme => {
  return createMuiTheme({
    palette: {
      type: themeType,
    },
    overrides: {
      MuiCardContent: {
        root: {
          padding: 24,
        },
      },
    },
  });
};

export default createMaterialTheme;
