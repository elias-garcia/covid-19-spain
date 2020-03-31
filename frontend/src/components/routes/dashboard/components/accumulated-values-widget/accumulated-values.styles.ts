import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridGap: theme.spacing(4),
    gridTemplateColumns: "repeat(auto-fit,minmax(250px, 1fr))",
  },
}));

export default useStyles;
