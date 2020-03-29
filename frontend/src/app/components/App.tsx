import React from "react";
import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import createMaterialTheme from "../../styles/create-material-theme";
import HeaderContainer from "../containers/HeaderContainer";
import MainContent from "./MainContent/MainContent";
import FooterContainer from "../containers/FooterContainer";
import DashboardContainer from "../routes/dashboard/containers/DashboardContainer";

export interface AppProps {
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

export default App;
