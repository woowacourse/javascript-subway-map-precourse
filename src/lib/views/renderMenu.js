import {
  MENU_DIV,
  menuButtonsId,
  tabTitles,
} from "../common/IdAndClassNames.js";
import { appTitle } from "../common/constants.js";

import Div from "./components/Div.js";
import Button from "./components/Button.js";

import { $appContainer } from "./utils/domManipulationFunctions.js";

export default () => {
  const $menu = new Div(MENU_DIV);
  const $menuButtons = tabTitles.map((tabTitle, idx) => {
    const innerText = /출력/.test(tabTitle)
      ? `${appTitle.substring(0, 7)} ${tabTitle}`
      : `${tabTitle} 관리`;
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
