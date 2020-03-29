import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles<Theme, { valueSign: number }>((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    color: (props) =>
      props.valueSign === 1
        ? theme.palette.error.main
        : props.valueSign === -1
        ? theme.palette.success.main
        : theme.palette.text.primary,
  },
  icon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  value: {
    marginLeft: theme.spacing(1),
  },
}));

export default useStyles;
