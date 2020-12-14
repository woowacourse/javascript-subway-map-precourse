import {
  TAB_CONTAINER_DIV,
  TABLE_CONTAINER_DIV,
} from "../../common/IdAndClassNames.js";
import { annulChangedState } from "../../_store/reducers.js";
import createTabComponent from "../../views/utils/createTabComponent.js";

export default (tabIndex) => {
  const $tabContainer = document.querySelector(TAB_CONTAINER_DIV);
  const $tableContainer = document.querySelector(TABLE_CONTAINER_DIV);
  const $tabComponent = createTabComponent(tabIndex);
  annulChangedState();
  $tabContainer.innerHTML = "";
  $tableContainer.innerHTML = "";
  $tabContainer.appendChild($tabComponent);
};
