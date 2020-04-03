import { Theme, createMuiTheme } from "@material-ui/core";
import pink from "@material-ui/core/colors/pink";
import blueGrey from "@material-ui/core/colors/blueGrey";

const createMaterialTheme = (themeType: "light" | "dark"): Theme => {
  return createMuiTheme({
    palette: {
      type: themeType,
      primary: pink,
      secondary: blueGrey,
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
