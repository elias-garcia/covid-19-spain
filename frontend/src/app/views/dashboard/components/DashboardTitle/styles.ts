import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles<Theme, { marginTop: number | undefined }>(
  (theme: Theme) => ({
    root: {
      marginTop: (props) =>
        props.marginTop !== undefined ? props.marginTop : theme.spacing(8),
      marginBottom: theme.spacing(5),
    },
  })
);

export default useStyles;
