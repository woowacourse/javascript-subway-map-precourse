import { annulChangedState } from "../../store/reducers.js";
import getInitViews from "../../views/common/getInitViews.js";

export default (tabIndex) => {
  annulChangedState();
  getInitViews(tabIndex);
};
