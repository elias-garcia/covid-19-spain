import React, { useEffect } from "react";

import useStyles from "./historical.styles";
import LoadingSpinner from "../../shared/loading-spinner/loading-spinner";

export interface HistoricalStateProps {
  readonly areReportsLoading: boolean;
}

export interface HistoricalHandlerProps {
  readonly onLoadData: () => void;
}

type HistoricalProps = HistoricalStateProps & HistoricalHandlerProps;

const Historical: React.FC<HistoricalProps> = ({
  areReportsLoading,
  onLoadData,
}) => {
  const classes = useStyles();

  useEffect(() => {
    onLoadData();
  }, [onLoadData]);

  if (areReportsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.pageLoadedWrapper}>
      <p>SUCCESS</p>
    </div>
  );
};

export default Historical;
