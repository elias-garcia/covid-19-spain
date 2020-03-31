import React from "react";

import HeaderContainer from "../../containers/HeaderContainer";
import MainContent from "../MainContent/MainContent";
import FooterContainer from "../../containers/FooterContainer";
import NavigationMenuContainer from "../../containers/NavigationMenuContainer";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <HeaderContainer />
      <NavigationMenuContainer />
      <MainContent>{children}</MainContent>
      <FooterContainer />
    </>
  );
};

export default Layout;
