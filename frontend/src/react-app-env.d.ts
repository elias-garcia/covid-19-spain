/// <reference types="react-scripts" />

import "@nivo/geo";

declare module "@nivo/geo" {
  interface CommonProps {
    legends?: any[];
  }
}
