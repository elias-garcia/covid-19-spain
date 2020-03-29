import React from "react";
import { Typography } from "@material-ui/core";

import useStyles from "./styles";

interface DashboardTitleProps {
  readonly text: string;
  readonly marginTop?: number;
}

const DashboardTitle: React.FC<DashboardTitleProps> = ({ text, marginTop }) => {
  const classes = useStyles({ marginTop });

  return (
    <Typography variant="h5" className={classes.root}>
      {text}
    </Typography>
  );
};

export default DashboardTitle;
