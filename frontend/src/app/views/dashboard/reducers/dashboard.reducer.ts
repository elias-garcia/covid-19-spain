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
import Report from "../../../../shared/domain/report.interface";
import AccumulatedValues from "../../../../shared/domain/accumulated-values.interface";
import { AsyncTask } from "../../../../shared/interfaces/async-task";

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
          step: "pending",
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
        reports: {
          step: "pending",
        },
      };
    }
    case LOAD_ACCUMULATED_VALUES_SUCCESS: {
      return {
        ...state,
        reports: {
          step: "successful",
          result: action.accumulatedValues,
        },
      };
    }
    case LOAD_ACCUMULATED_VALUES_ERROR: {
      return {
        ...state,
        reports: {
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
