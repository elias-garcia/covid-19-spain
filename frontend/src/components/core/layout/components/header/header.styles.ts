import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("md")]: {
      padding: `0 ${theme.spacing(5)}px`,
    },
    [theme.breakpoints.up("lg")]: {
      padding: `0 ${theme.spacing(10)}px`,
    },
  },
  brightnessButton: {
    color: theme.palette.common.white,
  },
}));

export default useStyles;
