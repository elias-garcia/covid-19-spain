import React, { useEffect } from "react";

import useStyles from "./historical.styles";
import LoadingSpinner from "../../shared/loading-spinner/loading-spinner";
import LineChartsWidget from "./components/line-charts-widget/line-charts-widget";

export interface HistoricalStateProps {
  readonly areReportsLoading: boolean;
}

export interface HistoricalHandlerProps {
  readonly onLoadData: () => void;
  readonly onAbortDataLoading: () => void;
}

type HistoricalProps = HistoricalStateProps & HistoricalHandlerProps;

const Historical: React.FC<HistoricalProps> = ({
  areReportsLoading,
  onLoadData,
  onAbortDataLoading,
}) => {
  const classes = useStyles();

  useEffect(() => {
    onLoadData();

    return () => onAbortDataLoading();
  }, [onLoadData, onAbortDataLoading]);

  if (areReportsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.pageLoadedWrapper}>
      <LineChartsWidget />
    </div>
  );
};

export default Historical;
