import React from "react";
import { Typography, Link } from "@material-ui/core";

import useStyles from "./footer.styles";

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography>
        An&nbsp;
        <Link
          href="https://github.com/elias-garcia/covid-19-spain"
          target="_blank"
        >
          open source project
        </Link>
        &nbsp;by&nbsp;
        <Link href="https://eliasgarcia.dev" target="_blank">
          Elías García
        </Link>
      </Typography>
    </footer>
  );
};

export default Footer;
