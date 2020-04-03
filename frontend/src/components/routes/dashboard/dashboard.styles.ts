import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  pageLoadedWrapper: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  lastReportUpdate: {
    paddingBottom: theme.spacing(6),
  },
  widget: {
    paddingBottom: theme.spacing(6),
    "&:last-of-type": {
      paddingBottom: 0,
    },
  },
}));

export default useStyles;
