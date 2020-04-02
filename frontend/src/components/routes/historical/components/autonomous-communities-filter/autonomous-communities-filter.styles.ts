import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(6),
  },
  formGroup: {
    width: "100%",
  },
  label: {
    marginBottom: theme.spacing(1),
  },
  autocomplete: {
    background: theme.palette.background.paper,
  },
}));

export default useStyles;
