import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { Brightness4 } from "@material-ui/icons";

import useStyles from "./styles";

export interface HeaderStateProps {
  readonly appTitle: string;
}

export interface HeaderHandlerProps {
  readonly onToggleTheme: () => void;
}

type HeaderProps = HeaderStateProps & HeaderHandlerProps;

const Header: React.FC<HeaderProps> = ({
  appTitle,
  onToggleTheme,
}: HeaderProps) => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">{appTitle}</Typography>
        <IconButton
          className={classes.brightnessButton}
          onClick={onToggleTheme}
        >
          <Brightness4 />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
