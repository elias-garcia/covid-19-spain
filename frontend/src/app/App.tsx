import React from "react";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";

import State from "../store/state";
import createMaterialTheme from "../styles/create-material-theme";
import HeaderContainer from "./containers/HeaderContainer";
import MainContent from "./components/MainContent/MainContent";
import FooterContainer from "./containers/FooterContainer";
import DashboardContainer from "./views/dashboard/containers/DashboardContainer";

interface AppProps {
  readonly themeType: "light" | "dark";
}

const App: React.FC<AppProps> = ({ themeType }: AppProps) => {
  const theme = createMaterialTheme(themeType);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeaderContainer />
      <MainContent>
        <DashboardContainer />
      </MainContent>
      <FooterContainer />
    </ThemeProvider>
  );
};

const mapStateToProps = (state: State): AppProps => ({
  themeType: state.app.themeType,
});

export default connect(mapStateToProps)(App);
