import { menuButtonsId, tabs } from "../../common/IdAndClassNames.js";
import { appTitle } from "../../common/constants.js";
import viewTabContainer from "../../_action/Menu/viewTabContainer.js";
import { isPrintMapTab } from "../utils/utils.js";
import Button from "../components/Button.js";

export default tabs.map(({ title }, index) => {
  const innerText = isPrintMapTab(title)
    ? `${appTitle.substring(0, 7)} ${title}`
    : `${title} 관리`;
  const $menuButton = new Button(
    menuButtonsId[index],
    `${index + 1}. ${innerText}`,
    () => viewTabContainer(index),
  );
  return $menuButton.element;
});
