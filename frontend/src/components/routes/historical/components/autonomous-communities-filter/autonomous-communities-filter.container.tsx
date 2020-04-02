import { connect } from "react-redux";

import AutonomousCommunitiesFilter, {
  AutonomousCommunitiesFilterHandlerProps,
  AutonomousCommunitiesFilterStateProps,
} from "./autonomous-communities-filter";
import State from "../../../../../store/state";
import { Dispatch } from "react";
import {
  HistoricalAction,
  updateSelectedAutonomousCommunities,
} from "../../historical.actions";

const mapStateToAllAutonomousCommunities = ({
  historical: { autonomousCommunities },
}: State): AutonomousCommunitiesFilterStateProps["allAutonomousCommunities"] => {
  if (autonomousCommunities.step !== "successful") {
    return undefined;
  }

  return autonomousCommunities.result.map(
    (autonomousCommunity) => autonomousCommunity.name
  );
};

const mapStateToProps = (
  state: State
): AutonomousCommunitiesFilterStateProps => ({
  allAutonomousCommunities: mapStateToAllAutonomousCommunities(state),
  selectedAutonomousCommunities: state.historical.selectedAutonomousCommunities,
});

const mapDispatchToProps = (
  dispatch: Dispatch<HistoricalAction>
): AutonomousCommunitiesFilterHandlerProps => ({
  onUpdateSelectedAutonomousCommunities: (autonomousCommunities) =>
    dispatch(updateSelectedAutonomousCommunities(autonomousCommunities)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutonomousCommunitiesFilter);
