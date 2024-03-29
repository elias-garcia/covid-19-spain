import React from "react";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route, Redirect } from "react-router";

import createMaterialTheme from "../../styles/create-material-theme";
import Layout from "../core/layout/layout.view";
import DashboardContainer from "../routes/dashboard/dashboard.container";
import HistoricalContainer from "../routes/historical/historical.container";

export interface AppProps {
  readonly themeType: "light" | "dark";
}

const App: React.FC<AppProps> = ({ themeType }: AppProps) => {
  const theme = createMaterialTheme(themeType);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route exact path="/" render={() => <DashboardContainer />} />
          <Route path="/historical" render={() => <HistoricalContainer />} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
