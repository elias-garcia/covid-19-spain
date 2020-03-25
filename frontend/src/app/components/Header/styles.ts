import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brightnessButton: {
    color: theme.palette.common.white,
  },
}));

export default useStyles;
