import React from "react";
import { Typography } from "@material-ui/core";

import useStyles from "./footer.styles";

export interface FooterProps {
  readonly appTitle: string;
}

const Footer: React.FC<FooterProps> = ({ appTitle }) => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography>{appTitle} by Elías García</Typography>
    </footer>
  );
};

export default Footer;
