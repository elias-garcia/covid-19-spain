import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";

export interface DashboardProps {
  readonly onLoadData: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  onLoadData,
}: DashboardProps) => {
  useEffect(() => {
    onLoadData();
  }, [onLoadData]);

  return <Typography>This is the main content of the page</Typography>;
};

export default Dashboard;
