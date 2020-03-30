import React from "react";
import { Select, MenuItem } from "@material-ui/core";

import useStyles from "./styles";
import WidgetCardTitle from "../WidgetCardTitle/WidgetCardTitle";

export interface FilterOption {
  readonly label: string;
  readonly value: string;
}

export interface WidgetCardTitleWithInlineFilterStateProps {
  readonly leftTitle?: string;
  readonly rightTitle?: string;
  readonly filterValue: string;
  readonly filterOptions: FilterOption[];
}

export interface WidgetCardTitleWithInlineFilterHandlerProps {
  readonly onFilterChange: (value: string) => void;
}

type WidgetCardTitleWithInlineFilterProps = WidgetCardTitleWithInlineFilterStateProps &
  WidgetCardTitleWithInlineFilterHandlerProps;

const WidgetCardTitleWithInlineFilter: React.FC<WidgetCardTitleWithInlineFilterProps> = ({
  leftTitle,
  rightTitle,
  filterValue,
  filterOptions,
  onFilterChange,
}) => {
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onFilterChange(event.target.value as string);
  };

  return (
    <div className={classes.root}>
      {leftTitle ? (
        <WidgetCardTitle title={leftTitle} className={classes.leftTitle} />
      ) : (
        <></>
      )}
      <Select
        value={filterValue}
        onChange={handleChange}
        className={classes.select}
      >
        {filterOptions.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {rightTitle ? (
        <WidgetCardTitle title={rightTitle} className={classes.rightTitle} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default WidgetCardTitleWithInlineFilter;
