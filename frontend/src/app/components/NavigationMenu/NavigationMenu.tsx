import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./styles";

export interface NavigationMenuProps {
  readonly pathname: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ pathname }) => {
  const classes = useStyles();

  return (
    <Tabs value={pathname} className={classes.root} centered>
      <Tab label="Today" value="/" component={Link} to="/" />
      <Tab
        label="Historical"
        value="/historical"
        component={Link}
        to="/historical"
      />
    </Tabs>
  );
};

export default NavigationMenu;
