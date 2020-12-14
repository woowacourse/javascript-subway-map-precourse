import { lineSelector } from "../selectors.js";

export default (updatedLineName) => {
  //const $tableBody = document.querySelector(SECTION_LIST).querySelector("tbody");
  //console.log($tableBody);
  const [updatedLineData] = lineSelector().filter(
    ({ lineName }) => lineName === updatedLineName,
  );
  //const {lineName, stations} = updatedLineData;
  //console.log(lineName, stations);
};
