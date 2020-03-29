import React from "react";
import * as materialIcons from "@material-ui/icons";
import { useTheme } from "@material-ui/core";

import AccumulatedValues from "../../../../../domain/accumulated-values.interface";
import AccumulatedValue from "../AccumulatedValue/AccumulatedValue";
import useStyles from "./styles";

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
        label="Cases"
        icon={materialIcons.People}
        color={theme.palette.primary.main}
        total={accumulatedValues.cases.total}
        diff={accumulatedValues.cases.diffWithYesterday}
      />
      <AccumulatedValue
        label="Hospitalized"
        icon={materialIcons.LocalHospital}
        color={theme.palette.info.main}
        total={accumulatedValues.hospitalized.total}
        diff={accumulatedValues.hospitalized.diffWithYesterday}
      />
      <AccumulatedValue
        label="ICU"
        icon={materialIcons.SentimentDissatisfied}
        color={theme.palette.warning.main}
        total={accumulatedValues.icu.total}
        diff={accumulatedValues.icu.diffWithYesterday}
      />
      <AccumulatedValue
        label="Deaths"
        icon={materialIcons.SentimentVeryDissatisfied}
        color={theme.palette.error.main}
        total={accumulatedValues.deaths.total}
        diff={accumulatedValues.deaths.diffWithYesterday}
      />
      <AccumulatedValue
        label="Recovered"
        icon={materialIcons.SentimentVerySatisfied}
        color={theme.palette.success.main}
        total={accumulatedValues.recovered.total}
        diff={accumulatedValues.recovered.diffWithYesterday}
      />
    </div>
  );
};

export default AccumulatedValuesWidget;
