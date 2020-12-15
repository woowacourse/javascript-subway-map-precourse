import { sectionStart } from "./sectionContainer.js";
import { displayInitialSection } from "./sectionPresenter.js";

const sectionManager = () => {
  const isDisplayed = displayInitialSection();

  if (isDisplayed) {
    sectionStart();
  }
};

export default sectionManager;
