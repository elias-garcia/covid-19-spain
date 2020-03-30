export type AsyncTask<T> =
  | {
      readonly step: "pending";
    }
  | {
      readonly step: "loading";
    }
  | {
      readonly step: "reloading" | "successful";
      readonly result: T;
    }
  | {
      readonly step: "failed";
      readonly message: string | string[];
    };
