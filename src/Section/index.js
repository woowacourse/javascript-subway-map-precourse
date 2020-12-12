import { lineStart } from "./lineContainer.js";
import { displayInitialLine } from "./linePresenter.js";

const lineManager = () => {
  const isDisplayed = displayInitialLine();

  if (isDisplayed) {
    lineStart();
  }
};

export default lineManager;
