export const safeArrayParse = (str: string) => {
  return str.replace(/[\[\]]/g, "").split(",");
};
