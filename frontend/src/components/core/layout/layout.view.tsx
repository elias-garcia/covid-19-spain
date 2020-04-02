import React from "react";

import HeaderContainer from "./components/header/header.container";
import NavigationMenuContainer from "./components/navigation-menu/navigation-menu-container";
import MainContent from "./components/main-content/main-content.view";
import FooterContainer from "./components/footer/footer.container";

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
