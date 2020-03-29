import React from "react";
import * as materialIcons from "@material-ui/icons";
import { useTheme } from "@material-ui/core";

import AccumulatedValues from "../../../../../shared/domain/accumulated-values.interface";
import AccumulatedValue from "../AccumulatedValue/AccumulatedValue";
import { AsyncTask } from "../../../../../shared/interfaces/async-task";
import useStyles from "./styles";

export interface AccumulatedValuesGridProps {
  readonly accumulatedValues: AsyncTask<AccumulatedValues>;
}

const AccumulatedValuesGrid: React.FC<AccumulatedValuesGridProps> = ({
  accumulatedValues,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  if (accumulatedValues.step !== "successful") {
    return <></>;
  }

  return (
    <div className={classes.root}>
      <AccumulatedValue
        label="Cases"
        icon={materialIcons.People}
        color={theme.palette.primary.main}
        total={accumulatedValues.result.cases.total}
        diff={accumulatedValues.result.cases.diffWithYesterday}
      />
      <AccumulatedValue
        label="Hospitalized"
        icon={materialIcons.LocalHospital}
        color={theme.palette.info.main}
        total={accumulatedValues.result.hospitalized.total}
        diff={accumulatedValues.result.hospitalized.diffWithYesterday}
      />
      <AccumulatedValue
        label="ICU"
        icon={materialIcons.SentimentDissatisfied}
        color={theme.palette.warning.main}
        total={accumulatedValues.result.icu.total}
        diff={accumulatedValues.result.icu.diffWithYesterday}
      />
      <AccumulatedValue
        label="Deaths"
        icon={materialIcons.SentimentVeryDissatisfied}
        color={theme.palette.error.main}
        total={accumulatedValues.result.deaths.total}
        diff={accumulatedValues.result.deaths.diffWithYesterday}
      />
      <AccumulatedValue
        label="Recovered"
        icon={materialIcons.SentimentVerySatisfied}
        color={theme.palette.success.main}
        total={accumulatedValues.result.recovered.total}
        diff={accumulatedValues.result.recovered.diffWithYesterday}
      />
    </div>
  );
};

export default AccumulatedValuesGrid;
