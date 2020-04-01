import React from "react";
import { CircularProgress, Typography } from "@material-ui/core";

import useStyles from "./loading-spinner.styles";

const LoadingSpinner: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.loadingWrapper}>
        <CircularProgress />
        <Typography className={classes.loadingText}>Loading data</Typography>
      </div>
    </div>
  );
};

export default LoadingSpinner;
