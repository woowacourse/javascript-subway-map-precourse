import { lineSelector } from "../selectors.js";

export default (updatedLineName) => {
  const [updatedLineData] = lineSelector().filter(
    ({ lineName }) => lineName === updatedLineName,
  );
  const {lineName, stations} = updatedLineData;
  console.log(lineName, stations);
};
