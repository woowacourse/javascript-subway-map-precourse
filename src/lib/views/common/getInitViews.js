import { TAB_CONTAINER_DIV } from "../../common/IdAndClassNames.js";
import createTabComponent from "./renderTabComponent.js";

export default (tabIndex) => {
  const $tabContainer = document.querySelector(TAB_CONTAINER_DIV);
  const $tabComponent = createTabComponent(tabIndex);
  $tabContainer.innerHTML = "";
  $tabContainer.appendChild($tabComponent);
};
