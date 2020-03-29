import { Reducer } from "redux";

import {
  DashboardAction,
  LOAD_REPORTS_SUCCESS,
  LOAD_REPORTS,
  LOAD_REPORTS_ERROR,
  LOAD_ACCUMULATED_VALUES,
  LOAD_ACCUMULATED_VALUES_ERROR,
  LOAD_ACCUMULATED_VALUES_SUCCESS,
} from "./dashboard.actions";
import Report from "../../../../domain/report.interface";
import AccumulatedValues from "../../../../domain/accumulated-values.interface";
import { AsyncTask } from "../../../../utils/async-task";

export interface DashboardState {
  readonly reports: AsyncTask<Report[]>;
  readonly accumulatedValues: AsyncTask<AccumulatedValues>;
}

const initialDashboardState: DashboardState = {
  reports: {
    step: "pending",
  },
  accumulatedValues: {
    step: "pending",
  },
};

const dashboardReducer: Reducer = (
  state = initialDashboardState,
  action: DashboardAction
): DashboardState => {
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
    case LOAD_REPORTS_ERROR: {
      return {
        ...state,
        reports: {
          step: "failed",
          message: action.message,
        },
      };
    }
    case LOAD_ACCUMULATED_VALUES: {
      return {
        ...state,
        accumulatedValues: {
          step: "loading",
        },
      };
    }
    case LOAD_ACCUMULATED_VALUES_SUCCESS: {
      return {
        ...state,
        accumulatedValues: {
          step: "successful",
          result: action.accumulatedValues,
        },
      };
    }
    case LOAD_ACCUMULATED_VALUES_ERROR: {
      return {
        ...state,
        accumulatedValues: {
          step: "failed",
          message: action.message,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default dashboardReducer;
