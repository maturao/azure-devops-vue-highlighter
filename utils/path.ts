export const getPathBasename = (path: string) =>
  path.split(/[\\/]/).pop() ?? "";
