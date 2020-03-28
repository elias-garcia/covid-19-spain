import React, { useEffect } from "react";
import { CircularProgress, Typography } from "@material-ui/core";

import useStyles from "./styles";
import AccumulatedValuesGridContainer from "../../containers/AccumulatedValuesGridContainer";

export interface DashboardStateProps {
  readonly isInitialDataLoading: boolean;
}

export interface DashboardHandlerProps {
  readonly onLoadData: () => void;
}

type DashboardProps = DashboardStateProps & DashboardHandlerProps;

const Dashboard: React.FC<DashboardProps> = ({
  isInitialDataLoading,
  onLoadData,
}: DashboardProps) => {
  const classes = useStyles();

  useEffect(() => {
    onLoadData();
  }, [onLoadData]);

  if (isInitialDataLoading) {
    return (
      <div className={classes.pageLoadingWrapper}>
        <div className={classes.loadingWrapper}>
          <CircularProgress />
          <Typography className={classes.loadingText}>Loading data</Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.pageLoadedWrapper}>
      <Typography variant="h5" className={classes.title}>
        Accumulated values
      </Typography>
      <AccumulatedValuesGridContainer />
    </div>
  );
};

export default Dashboard;
