import { Dispatch } from "redux";
import { connect } from "react-redux";

import State from "../../store/state";
import Header, {
  HeaderStateProps,
  HeaderHandlerProps,
} from "../components/Header/Header";
import { toggleTheme, AppAction } from "../store/app.actions";

const mapStateToProps = (state: State): HeaderStateProps => ({
  appTitle: state.app.title,
});

const mapDispatchToProps = (
  dispatch: Dispatch<AppAction>
): HeaderHandlerProps => ({
  onToggleTheme: () => dispatch(toggleTheme()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
