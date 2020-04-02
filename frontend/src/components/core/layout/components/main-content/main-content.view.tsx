import React from "react";

import useStyles from "./main-content.styles";

const MainContent: React.FC = ({ children }) => {
  const classes = useStyles();

  return <main className={classes.root}>{children}</main>;
};

export default MainContent;
