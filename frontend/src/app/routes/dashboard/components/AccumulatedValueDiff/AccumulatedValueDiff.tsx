import React from "react";
import { TrendingUp, TrendingDown, TrendingFlat } from "@material-ui/icons";
import { Typography } from "@material-ui/core";

import useStyles from "./styles";

interface AccumulatedValueDiffProps {
  readonly value: number;
}

const AccumulatedValueDiff: React.FC<AccumulatedValueDiffProps> = ({
  value,
}) => {
  const valueSign = Math.sign(value);
  const classes = useStyles({ valueSign });

  return (
    <div className={classes.root}>
      {valueSign === 1 ? (
        <TrendingUp className={classes.icon} />
      ) : valueSign === -1 ? (
        <TrendingDown className={classes.icon} />
      ) : (
        <TrendingFlat />
      )}
      <Typography className={classes.value}>
        {value.toLocaleString()}
      </Typography>
    </div>
  );
};

export default AccumulatedValueDiff;
