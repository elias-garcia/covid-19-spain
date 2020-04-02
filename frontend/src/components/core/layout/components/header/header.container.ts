import { Dispatch } from "redux";
import { connect } from "react-redux";

import State from "../../../../../store/state";
import Header, { HeaderStateProps, HeaderHandlerProps } from "./header.view";
import { toggleTheme, AppAction } from "../../../../app/app.actions";

const mapStateToProps = (state: State): HeaderStateProps => ({
  appTitle: state.app.title,
});

const mapDispatchToProps = (
  dispatch: Dispatch<AppAction>
): HeaderHandlerProps => ({
  onToggleTheme: () => dispatch(toggleTheme()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
