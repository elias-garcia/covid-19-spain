import { Dispatch } from "redux";
import { connect } from "react-redux";

import Dashboard, { DashboardProps } from "../Dashboard";
import { loadData, DashboardAction } from "../reducers/dashboard.actions";

const mapDispatchToProps = (
  dispatch: Dispatch<DashboardAction>
): DashboardProps => ({
  onLoadData: () => dispatch(loadData()),
});

export default connect(undefined, mapDispatchToProps)(Dashboard);
