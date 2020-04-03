import React, { useEffect } from "react";

import useStyles from "./dashboard.styles";
import AccumulatedValuesWidgetContainer from "./components/accumulated-values-widget/accumulated-values-widget.container";
import ChoroplethWidgetContainer from "./components/choropleth-widget/choropleth-widget.container";
import LoadingSpinner from "../../shared/loading-spinner/loading-spinner.view";
import { Typography } from "@material-ui/core";

export interface DashboardStateProps {
  readonly isInitialDataLoading: boolean;
  readonly lastReportUpdate: string | undefined;
}

export interface DashboardHandlerProps {
  readonly onLoadData: () => void;
  readonly onAbortDataLoading: () => void;
}

type DashboardProps = DashboardStateProps & DashboardHandlerProps;

const Dashboard: React.FC<DashboardProps> = ({
  isInitialDataLoading,
  lastReportUpdate,
  onLoadData,
  onAbortDataLoading,
}: DashboardProps) => {
  const classes = useStyles();

  useEffect(() => {
    onLoadData();

    return () => onAbortDataLoading();
  }, [onLoadData, onAbortDataLoading]);

  if (isInitialDataLoading || !lastReportUpdate) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.pageLoadedWrapper}>
      <div className={classes.lastReportUpdate}>
        <Typography variant="h5">
          Date of the last published report:&nbsp;
          {new Date(lastReportUpdate).toLocaleDateString()}
        </Typography>
      </div>
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
