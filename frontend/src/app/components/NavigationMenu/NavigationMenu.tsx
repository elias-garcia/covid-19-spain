import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import useStyles from "./styles";

const NavigationMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <Tabs value={0} className={classes.root} centered>
      <Tab label="Today" />
      <Tab label="Historical" />
    </Tabs>
  );
};

export default NavigationMenu;
