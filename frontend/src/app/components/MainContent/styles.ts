import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    minHeight: "calc(100vh - (56px + 40px))",
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      minHeight: "calc(100vh - (48px + 40px))",
    },
    [theme.breakpoints.up("sm")]: {
      minHeight: "calc(100vh - (64px + 48px))",
      padding: theme.spacing(3),
    },
  },
}));

export default useStyles;
