import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  pageLoadingWrapper: {
    flex: 1,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pageLoadedWrapper: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  loadingWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: theme.spacing(2),
  },
  widget: {
    paddingBottom: theme.spacing(6),
    "&:last-of-type": {
      paddingBottom: 0,
    },
  },
}));

export default useStyles;
