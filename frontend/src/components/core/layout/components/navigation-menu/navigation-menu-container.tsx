import { connect } from "react-redux";

import NavigationMenu, { NavigationMenuProps } from "./navigation-menu.view";
import State from "../../../../../store/state";

const mapStateToProps = (state: State): NavigationMenuProps => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(NavigationMenu);
