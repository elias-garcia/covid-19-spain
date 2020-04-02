import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles<
  Theme,
  { valueSign: number; invertColor: boolean }
>((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    color: (props) => {
      if (props.valueSign === 1) {
        return props.invertColor
          ? theme.palette.success.main
          : theme.palette.error.main;
      }
      if (props.valueSign === -1) {
        return props.invertColor
          ? theme.palette.error.main
          : theme.palette.success.main;
      }

      return theme.palette.text.primary;
    },
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
