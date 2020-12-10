import {
  TAB_CONTAINER_DIV,
  menuButtonsId,
  tabs,
} from "../../common/IdAndClassNames.js";
import { appTitle } from "../../common/constants.js";
import createTabComponent from "../utils/createTabComponent.js";
import { isPrintMapTab } from "../utils/utils.js";
import Button from "../components/Button.js";

const renderContainer = (index) => {
  const $tabContainer = document.querySelector(TAB_CONTAINER_DIV);
  const $tabComponent = createTabComponent(index);
  $tabContainer.innerHTML = "";
  $tabContainer.appendChild($tabComponent);
};

export default tabs.map(({ title }, index) => {
  const innerText = isPrintMapTab(title)
    ? `${appTitle.substring(0, 7)} ${title}`
    : `${title} 관리`;
  const $menuButton = new Button(
    menuButtonsId[index],
    `${index + 1}. ${innerText}`,
  );

  $menuButton.addEventListener(() => renderContainer(index));
  $menuButton.addRightSpace();
  return $menuButton.element;
});
