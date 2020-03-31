import React from "react";

import HeaderContainer from "../../containers/HeaderContainer";
import MainContent from "../MainContent/MainContent";
import FooterContainer from "../../containers/FooterContainer";
import NavigationMenu from "../NavigationMenu/NavigationMenu";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <HeaderContainer />
      <NavigationMenu />
      <MainContent>{children}</MainContent>
      <FooterContainer />
    </>
  );
};

export default Layout;
