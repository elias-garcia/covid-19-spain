import React from "react";
import { TextField, Typography, Chip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import useStyles from "./autonomous-communities-filter.styles";

export interface AutonomousCommunitiesFilterStateProps {
  readonly allAutonomousCommunities: string[] | undefined;
  readonly selectedAutonomousCommunities: string[];
}

export interface AutonomousCommunitiesFilterHandlerProps {
  readonly onUpdateSelectedAutonomousCommunities: (
    autonomousCommunities: string[]
  ) => void;
}

type AutonomousCommunitiesFilterProps = AutonomousCommunitiesFilterStateProps &
  AutonomousCommunitiesFilterHandlerProps;

const AutonomousCommunitiesFilter: React.FC<AutonomousCommunitiesFilterProps> = ({
  allAutonomousCommunities,
  selectedAutonomousCommunities,
  onUpdateSelectedAutonomousCommunities,
}) => {
  const classes = useStyles();

  if (allAutonomousCommunities === undefined) {
    return <></>;
  }

  const handleAutocompleteChange = (
    _event: React.ChangeEvent<{}>,
    value: unknown
  ): void => {
    onUpdateSelectedAutonomousCommunities(value as string[]);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.label}>
        Filter by autonomous community
      </Typography>
      <Autocomplete
        multiple
        options={allAutonomousCommunities}
        value={selectedAutonomousCommunities}
        filterSelectedOptions
        onChange={handleAutocompleteChange}
        className={classes.autocomplete}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              disabled={index === 0}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Autonomous communities"
          />
        )}
      />
    </div>
  );
};

export default AutonomousCommunitiesFilter;
