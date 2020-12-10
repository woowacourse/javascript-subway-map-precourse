import { menuButtonsId, tabTitles } from "../../common/IdAndClassNames.js";
import { appTitle } from "../../common/constants.js";

import Button from "../components/Button.js";

export default tabTitles.map((tabTitle, idx) => {
  const innerText = /출력/.test(tabTitle)
    ? `${appTitle.substring(0, 7)} ${tabTitle}`
    : `${tabTitle} 관리`;
  const $menuButton = new Button(
    menuButtonsId[idx],
    `${idx + 1}. ${innerText}`,
  );
  $menuButton.addEventListener(() => console.log(tabTitle));
  $menuButton.addRightSpace();
  return $menuButton.element;
});
