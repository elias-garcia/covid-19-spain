import React from "react";

import HeaderContainer from "./components/header/header.container";
import NavigationMenuContainer from "./components/navigation-menu/navigation-menu-container";
import MainContent from "./components/main-content/main-content.view";
import Footer from "./components/footer/footer.view";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <HeaderContainer />
      <NavigationMenuContainer />
      <MainContent>{children}</MainContent>
      <Footer />
    </>
  );
};

export default Layout;
