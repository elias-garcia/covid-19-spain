import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },
  divider: {
    marginTop: theme.spacing(2),
    marginRight: `-${theme.spacing(3)}px`,
    marginBottom: theme.spacing(3),
    marginLeft: `-${theme.spacing(3)}px`,
  },
}));

export default useStyles;
