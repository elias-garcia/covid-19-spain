import React from "react";
import * as materialIcons from "@material-ui/icons";
import { useTheme } from "@material-ui/core";

import AccumulatedValues from "../../../../../domain/accumulated-values.interface";
import AccumulatedValue from "../accumulated-value/accumulated-value.view";
import useStyles from "./accumulated-values.styles";

export interface AccumulatedValuesWidgetProps {
  readonly accumulatedValues: AccumulatedValues | undefined;
}

const AccumulatedValuesWidget: React.FC<AccumulatedValuesWidgetProps> = ({
  accumulatedValues,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  if (accumulatedValues === undefined) {
    return <></>;
  }

  return (
    <div className={classes.root}>
      <AccumulatedValue
        label="Total cases"
        icon={materialIcons.People}
        color={theme.palette.primary.main}
        total={accumulatedValues.cases.total}
        diff={accumulatedValues.cases.diffWithYesterday}
      />
      <AccumulatedValue
        label="Total hospitalized"
        icon={materialIcons.LocalHospital}
        color={theme.palette.info.main}
        total={accumulatedValues.hospitalized.total}
        diff={accumulatedValues.hospitalized.diffWithYesterday}
      />
      <AccumulatedValue
        label="Total in ICU"
        icon={materialIcons.SentimentDissatisfied}
        color={theme.palette.warning.main}
        total={accumulatedValues.icu.total}
        diff={accumulatedValues.icu.diffWithYesterday}
      />
      <AccumulatedValue
        label="Total deaths"
        icon={materialIcons.SentimentVeryDissatisfied}
        color={theme.palette.error.main}
        total={accumulatedValues.deaths.total}
        diff={accumulatedValues.deaths.diffWithYesterday}
      />
      <AccumulatedValue
        label="Total recovered"
        icon={materialIcons.SentimentVerySatisfied}
        color={theme.palette.success.main}
        total={accumulatedValues.recovered.total}
        diff={accumulatedValues.recovered.diffWithYesterday}
        invertDiffColor={true}
      />
    </div>
  );
};

export default AccumulatedValuesWidget;
