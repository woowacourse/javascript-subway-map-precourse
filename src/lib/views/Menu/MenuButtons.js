import { menuButtonsId } from "../../common/IdAndClassNames.js";
import { appTitle } from "../../common/constants.js";
import tabsList from "../common/tabsList.js";
import viewTabContainer from "../../action/Menu/viewTabContainer.js";
import { isPrintMapTab } from "../common/utils.js";
import Button from "../components/Button.js";

export default tabsList.map(({ title }, index) => {
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
