import { MENU_DIV, menuButtonsId } from "../common/IdAndClassNames.js";

import Div from "./components/Div.js";
import Button from "./components/Button.js";

import { $appContainer } from "./utils/domManipulationFunctions.js";

export default () => {
  const $menu = new Div(MENU_DIV);
  const menuButtonNames = [
    "역 관리",
    "노선 관리",
    "구간 관리",
    "지하철 노선도 출력",
  ];
  const $menuButtons = menuButtonNames.map((innerText, idx) => {
    const $menuButton = new Button(
      menuButtonsId[idx],
      `${idx + 1}. ${innerText}`,
    );
    $menuButton.addRightSpace();
    return $menuButton.element;
  });
  $menu.addChildNodes($menuButtons);
  $appContainer.appendChild($menu.getElement());
};
