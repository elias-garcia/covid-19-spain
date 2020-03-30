import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 250,
    [theme.breakpoints.up("sm")]: {
      height: 400,
    },
    [theme.breakpoints.up("md")]: {
      height: 600,
    },
  },
}));

export default useStyles;
