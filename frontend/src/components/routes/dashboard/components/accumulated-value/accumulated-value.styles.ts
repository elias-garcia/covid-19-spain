import { makeStyles, Theme } from "@material-ui/core";
import { lighten } from "@material-ui/core/styles";

const useStyles = makeStyles<Theme, { color: string }>((theme: Theme) => ({
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    padding: theme.spacing(2),
    backgroundColor: (props) => lighten(props.color, 0.95),
  },
  icon: {
    color: (props) => props.color,
  },
  total: {
    margin: `${theme.spacing(2)}px 0 0 0`,
  },
}));

export default useStyles;
