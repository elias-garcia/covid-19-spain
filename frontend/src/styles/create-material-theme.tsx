import { Theme, createMuiTheme } from "@material-ui/core";

const createMaterialTheme = (themeType: "light" | "dark"): Theme => {
  return createMuiTheme({
    palette: {
      type: themeType,
    },
  });
};

export default createMaterialTheme;
