import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    margin: "-6px 0 -7px",
  },
  select: {
    fontSize: theme.typography.h5.fontSize,
    color: theme.palette.primary.main,
  },
  leftTitle: {
    padding: "6px 0 7px",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(1),
    },
  },
  rightTitle: {
    padding: "6px 0 7px",
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
    },
  },
}));

export default useStyles;
