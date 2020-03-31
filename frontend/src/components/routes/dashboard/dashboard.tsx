import React, { useEffect } from "react";
import { CircularProgress, Typography } from "@material-ui/core";

import useStyles from "./dashboard.styles";
import {
  AccumulatedValuesWidgetContainer,
  ChoroplethWidgetContainer,
} from "./components";

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
      {/* <DashboardTitle text="Accumulated values" marginTop={0} /> */}
      <div className={classes.widget}>
        <AccumulatedValuesWidgetContainer />
      </div>
      {/* <DashboardTitle text="Values by autonomous community" /> */}
      <div className={classes.widget}>
        <ChoroplethWidgetContainer />
      </div>
    </div>
  );
};

export default Dashboard;
