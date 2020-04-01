import { Reducer } from "redux";

import {
  DashboardAction,
  LOAD_LATEST_REPORT_SUCCESS,
  LOAD_LATEST_REPORT,
  LOAD_LATEST_REPORT_ERROR,
  LOAD_ACCUMULATED_VALUES,
  LOAD_ACCUMULATED_VALUES_ERROR,
  LOAD_ACCUMULATED_VALUES_SUCCESS,
  CHANGE_CHOROPLETH_FILTER,
} from "./dashboard.actions";
import Report, { Field } from "../../../domain/report.interface";
import AccumulatedValues from "../../../domain/accumulated-values.interface";
import { AsyncTask } from "../../../utils/async-task";

export interface DashboardState {
  readonly latestReport: AsyncTask<Report>;
  readonly accumulatedValues: AsyncTask<AccumulatedValues>;
  readonly choroplethFilter: Field;
}

const initialDashboardState: DashboardState = {
  latestReport: {
    step: "pending",
  },
  accumulatedValues: {
    step: "pending",
  },
  choroplethFilter: "cases",
};

const dashboardReducer: Reducer<DashboardState, DashboardAction> = (
  state = initialDashboardState,
  action: DashboardAction
): DashboardState => {
  switch (action.type) {
    case LOAD_LATEST_REPORT: {
      return {
        ...state,
        latestReport: {
          step: "loading",
        },
      };
    }
    case LOAD_LATEST_REPORT_SUCCESS: {
      return {
        ...state,
        latestReport: {
          step: "successful",
          result: action.report,
        },
      };
    }
    case LOAD_LATEST_REPORT_ERROR: {
      return {
        ...state,
        latestReport: {
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
    case CHANGE_CHOROPLETH_FILTER: {
      return {
        ...state,
        choroplethFilter: action.newValue,
      };
    }
    default: {
      return state;
    }
  }
};

export default dashboardReducer;
