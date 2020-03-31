import React from "react";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route, Redirect } from "react-router";

import createMaterialTheme from "../../styles/create-material-theme";
import DashboardContainer from "../routes/dashboard/containers/DashboardContainer";
import Layout from "./Layout/Layout";
import Historical from "../routes/historical/components/Historical/Historical";

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
          <Route path="/historical" render={() => <Historical />} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
