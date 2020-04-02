import React from "react";
import { Typography } from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";

import useStyles from "./accumulated-value.styles";
import WidgetCard from "../../../../shared/widget-card/widget-card";
import AccumulatedValueDiff from "../accumulated-value-diff/AccumulatedValueDiff";

export interface AccumulatedValueProps {
  readonly label: string;
  readonly icon: SvgIconComponent;
  readonly color: string;
  readonly total: number;
  readonly diff: number;
  readonly invertDiffColor?: boolean;
}

const AccumulatedValue: React.FC<AccumulatedValueProps> = ({
  label,
  icon: Icon,
  color,
  total,
  diff,
  invertDiffColor,
}) => {
  const classes = useStyles({ color });

  return (
    <WidgetCard className={classes.cardContent}>
      <div className={classes.iconWrapper}>
        <Icon className={classes.icon} />
      </div>
      <Typography className={classes.total} variant="h4">
        {total.toLocaleString()}
      </Typography>
      <Typography>{label}</Typography>
      <AccumulatedValueDiff
        value={diff}
        invertColor={invertDiffColor ? true : false}
      />
    </WidgetCard>
  );
};

export default AccumulatedValue;
