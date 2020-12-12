import { TAB_CONTAINER_DIV } from "../../common/IdAndClassNames.js";
import { annulChangedState } from "../../_store/reducers.js";
import createTabComponent from "../../views/utils/createTabComponent.js";

export default (tabIndex) => {
  const $tabContainer = document.querySelector(TAB_CONTAINER_DIV);
  const $tabComponent = createTabComponent(tabIndex);
  annulChangedState();
  console.log(localStorage);
  $tabContainer.innerHTML = "";
  $tabContainer.appendChild($tabComponent);
};
