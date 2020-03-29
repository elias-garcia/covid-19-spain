import React, { useEffect } from "react";
import { CircularProgress, Typography } from "@material-ui/core";

import useStyles from "./styles";
import AccumulatedValuesGridContainer from "../../containers/AccumulatedValuesGridContainer";
import DashboardTitle from "../DashboardTitle/DashboardTitle";
import ChoroplethContainer from "../../containers/ChoroplethContainer";

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
      <DashboardTitle text="Accumulated values" marginTop={0} />
      <AccumulatedValuesGridContainer />
      <DashboardTitle text="Values by autonomous community" />
      <ChoroplethContainer />
    </div>
  );
};

export default Dashboard;
