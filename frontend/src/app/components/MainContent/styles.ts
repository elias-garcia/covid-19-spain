import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    minHeight: "calc(100vh - (56px + 40px))",
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      minHeight: "calc(100vh - (48px + 40px))",
    },
    [theme.breakpoints.up("sm")]: {
      minHeight: "calc(100vh - (64px + 48px))",
      padding: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
      padding: `${theme.spacing(6)}px ${theme.spacing(10)}px`,
    },
  },
}));

export default useStyles;
