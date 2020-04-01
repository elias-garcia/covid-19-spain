import { Reducer } from "redux";

import { AsyncTask } from "../../../utils/async-task";
import Report from "../../../domain/report.interface";
import {
  HistoricalAction,
  LOAD_REPORTS_SUCCESS,
  LOAD_REPORTS_ERROR,
  LOAD_REPORTS,
} from "./historical.actions";

export interface HistoricalState {
  readonly reports: AsyncTask<Report[]>;
}

const initialState: HistoricalState = {
  reports: {
    step: "pending",
  },
};

// tslint:disable-next-line: no-any
const historicalReducer: Reducer<HistoricalState, HistoricalAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOAD_REPORTS: {
      return {
        reports: {
          step: "loading",
        },
      };
    }
    case LOAD_REPORTS_SUCCESS: {
      return {
        reports: {
          step: "successful",
          result: action.reports,
        },
      };
    }
    case LOAD_REPORTS_ERROR: {
      return {
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

export default historicalReducer;
