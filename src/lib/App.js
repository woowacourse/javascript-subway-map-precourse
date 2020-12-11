import Div from "./views/components/Div.js";
import { $appContainer } from "./views/utils/utils.js";
import { MENU_DIV, TAB_CONTAINER_DIV } from "./common/IdAndClassNames.js";
import MenuButtons from "./views/Menu/MenuButtons.js";
import setInitState from "./_store/setInitState.js";

export default () => {
  const $menu = new Div(MENU_DIV);
  const $tabContainer = new Div(TAB_CONTAINER_DIV);

  MenuButtons.forEach((menuButton) => $menu.element.appendChild(menuButton));

  setInitState();

  $appContainer.appendChild($menu.element);
  $appContainer.appendChild($tabContainer.element);
};
