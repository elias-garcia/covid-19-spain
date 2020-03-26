import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: theme.spacing(5),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `0 ${theme.spacing(2)}px`,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("sm")]: {
      height: theme.spacing(6),
      padding: `0 ${theme.spacing(3)}px`,
    },
  },
}));

export default useStyles;
