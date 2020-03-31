import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    position: "fixed",
    left: 0,
    right: 0,
    top: 56,
    zIndex: theme.zIndex.drawer,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      top: 48,
    },
    [theme.breakpoints.up("sm")]: {
      top: 64,
    },
  },
}));

export default useStyles;
