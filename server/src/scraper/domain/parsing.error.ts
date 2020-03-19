export { ParsingError };

class ParsingError extends Error {
  constructor(reason: string) {
    super(reason);
  }
}
