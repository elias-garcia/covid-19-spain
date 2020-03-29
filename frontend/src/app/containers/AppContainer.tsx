import { connect } from "react-redux";

import State from "../../store/state";
import App, { AppProps } from "../components/App";

const mapStateToProps = (state: State): AppProps => ({
  themeType: state.app.themeType,
});

export default connect(mapStateToProps)(App);
