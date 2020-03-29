import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";

import useStyles from "./styles";
import AccumulatedValueDiff from "../AccumulatedValueDiff/AccumulatedValueDiff";

export interface AccumulatedValueProps {
  readonly className?: string;
  readonly label: string;
  readonly icon: SvgIconComponent;
  readonly color: string;
  readonly total: number;
  readonly diff: number;
}

const AccumulatedValue: React.FC<AccumulatedValueProps> = ({
  label,
  icon: Icon,
  color,
  total,
  diff,
}) => {
  const classes = useStyles({ color });

  return (
    <Card>
      <CardContent className={classes.cardContent}>
        <div className={classes.iconWrapper}>
          <Icon className={classes.icon} />
        </div>
        <Typography className={classes.total} variant="h4">
          {total.toLocaleString()}
        </Typography>
        <Typography>{label}</Typography>
        <AccumulatedValueDiff value={diff} />
      </CardContent>
    </Card>
  );
};

export default AccumulatedValue;
