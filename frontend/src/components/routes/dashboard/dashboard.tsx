import React, { useEffect } from "react";

import useStyles from "./dashboard.styles";
import {
  AccumulatedValuesWidgetContainer,
  ChoroplethWidgetContainer,
} from "./components";
import LoadingSpinner from "../../shared/loading-spinner/loading-spinner";

export interface DashboardStateProps {
  readonly isInitialDataLoading: boolean;
}

export interface DashboardHandlerProps {
  readonly onLoadData: () => void;
  readonly onAbortDataLoading: () => void;
}

type DashboardProps = DashboardStateProps & DashboardHandlerProps;

const Dashboard: React.FC<DashboardProps> = ({
  isInitialDataLoading,
  onLoadData,
  onAbortDataLoading,
}: DashboardProps) => {
  const classes = useStyles();

  useEffect(() => {
    onLoadData();

    return () => onAbortDataLoading();
  }, [onLoadData, onAbortDataLoading]);

  if (isInitialDataLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.pageLoadedWrapper}>
      <div className={classes.widget}>
        <AccumulatedValuesWidgetContainer />
      </div>
      <div className={classes.widget}>
        <ChoroplethWidgetContainer />
      </div>
    </div>
  );
};

export default Dashboard;
