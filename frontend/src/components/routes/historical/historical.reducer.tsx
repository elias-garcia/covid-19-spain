import { Reducer } from "redux";

import { AsyncTask } from "../../../utils/async-task";
import Report from "../../../domain/report.interface";
import {
  HistoricalAction,
  LOAD_REPORTS_SUCCESS,
  LOAD_REPORTS_FAILURE,
  LOAD_REPORTS,
  LOAD_AUTONOMOUS_COMMUNITIES,
  LOAD_AUTONOMOUS_COMMUNITIES_SUCCESS,
  LOAD_AUTONOMOUS_COMMUNITIES_FAILURE,
  UPDATE_SELECTED_AUTONOMOUS_COMMUNITIES,
} from "./historical.actions";
import { AutonomousCommunity } from "../../../domain/autonomous-community";

export interface HistoricalState {
  readonly reports: AsyncTask<Report[]>;
  readonly autonomousCommunities: AsyncTask<AutonomousCommunity[]>;
  readonly selectedAutonomousCommunities: string[];
}

const initialState: HistoricalState = {
  reports: {
    step: "pending",
  },
  autonomousCommunities: {
    step: "pending",
  },
  selectedAutonomousCommunities: ["madrid", "galicia"],
};

// tslint:disable-next-line: no-any
const historicalReducer: Reducer<HistoricalState, HistoricalAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_REPORTS: {
      return {
        ...state,
        reports: {
          step: "loading",
        },
      };
    }
    case LOAD_REPORTS_SUCCESS: {
      return {
        ...state,
        reports: {
          step: "successful",
          result: action.reports,
        },
      };
    }
    case LOAD_REPORTS_FAILURE: {
      return {
        ...state,
        reports: {
          step: "failed",
          message: action.message,
        },
      };
    }
    case LOAD_AUTONOMOUS_COMMUNITIES: {
      return {
        ...state,
        autonomousCommunities: {
          step: "loading",
        },
      };
    }
    case LOAD_AUTONOMOUS_COMMUNITIES_SUCCESS: {
      return {
        ...state,
        autonomousCommunities: {
          step: "successful",
          result: action.autonomousCommunities,
        },
      };
    }
    case LOAD_AUTONOMOUS_COMMUNITIES_FAILURE: {
      return {
        ...state,
        autonomousCommunities: {
          step: "failed",
          message: action.message,
        },
      };
    }
    case UPDATE_SELECTED_AUTONOMOUS_COMMUNITIES: {
      return {
        ...state,
        selectedAutonomousCommunities: action.autonomousCommunities,
      };
    }
    default: {
      return state;
    }
  }
};

export default historicalReducer;
