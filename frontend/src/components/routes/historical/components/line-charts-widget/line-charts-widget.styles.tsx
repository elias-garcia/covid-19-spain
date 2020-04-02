import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  lineChart: {
    paddingBottom: theme.spacing(6),
    "&:last-of-type": {
      paddingBottom: 0,
    },
  },
}));

export default useStyles;
