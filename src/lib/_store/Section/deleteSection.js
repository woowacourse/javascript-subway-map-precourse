import deleteStationFromLine from "../common/deleteStationFromLine.js";
import {SECTION_TAB_INDEX} from "../../common/constants.js";
import updateTable from "../common/updateTable.js";

export default (deletedStationName, updatedLineName) => {
  deleteStationFromLine(updatedLineName, deletedStationName);
};
