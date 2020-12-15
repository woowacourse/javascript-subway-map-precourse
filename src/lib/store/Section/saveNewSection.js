import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";
import { SECTION_TAB_INDEX } from "../../common/constants.js";
import updateTable from "../common/updateTable.js";

export default (sectionData) => {
  const { lineName } = sectionData;
  const originalLineList = lineSelector();
  const updatedLineList = originalLineList.map((lineData) => {
    if (lineData.lineName === lineName) {
      lineData.addSectionInfo(sectionData);
    }
    return lineData;
  });
  lineReducer(updatedLineList);
  updateTable({ tabIndex: SECTION_TAB_INDEX, lineName });
};
