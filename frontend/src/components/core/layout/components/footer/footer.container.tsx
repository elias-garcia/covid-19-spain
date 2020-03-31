import { connect } from "react-redux";

import State from "../../../../../store/state";
import Footer, { FooterProps } from "./footer";

const mapStateToProps = (state: State): FooterProps => ({
  appTitle: state.app.title,
});

export default connect(mapStateToProps)(Footer);
