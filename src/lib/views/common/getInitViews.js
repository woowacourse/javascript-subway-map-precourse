import {
  TAB_CONTAINER_DIV,
  TABLE_CONTAINER_DIV,
} from "../../common/IdAndClassNames.js";
import createTabComponent from "./createTabComponent.js";

export default (tabIndex) => {
  const $tabContainer = document.querySelector(TAB_CONTAINER_DIV);
  const $tableContainer = document.querySelector(TABLE_CONTAINER_DIV);
  const $tabComponent = createTabComponent(tabIndex);
  $tabContainer.innerHTML = "";
  $tableContainer.innerHTML = "";
  $tabContainer.appendChild($tabComponent);
};
