import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    overflowX: "auto",
    [theme.breakpoints.up("lg")]: {
      height: 450,
      overflow: "hidden",
    },
  },
}));

export default useStyles;
