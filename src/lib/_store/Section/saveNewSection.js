import { lineSelector } from "../selectors.js";
import { lineReducer } from "../reducers.js";
import updateUI from "./updateUI.js";

export default (sectionData) => {
  const { lineName } = sectionData;

  updateUI(lineName);
};
