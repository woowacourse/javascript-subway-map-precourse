
import { annulChangedState } from "../../_store/reducers.js";
import getInitViews from "../../views/common/getInitViews.js";

export default (tabIndex) => {
  annulChangedState();
  getInitViews(tabIndex);
};
