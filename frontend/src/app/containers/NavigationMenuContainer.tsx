import { connect } from "react-redux";

import NavigationMenu, {
  NavigationMenuProps,
} from "../components/NavigationMenu/NavigationMenu";
import State from "../../store/state";

const mapStateToProps = (state: State): NavigationMenuProps => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(NavigationMenu);
