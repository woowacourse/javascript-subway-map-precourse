import {
  MENU_DIV,
  SELECT_LINE_BUTTON,
  STATION_NAME_INPUT,
  ADD_STATION_INPUT,
  ADD_SECTION_BUTTON,
  SECTION_ORDER_INPUT,
} from "../../common/IdAndClassNames.js";

const openStyleTag = "<style>";
const closeStyleTag = "</style>";

const addTableStyle = `
  table, th, td {
    border: 1px solid black;
  }
  tr {
    text-align: center;
  }
`;

const addMarginStyle = `
  div${MENU_DIV} button, button${SELECT_LINE_BUTTON} {
    margin-right: 4px;
  }
  button${ADD_STATION_INPUT}, button${ADD_SECTION_BUTTON}, input${SECTION_ORDER_INPUT} {
    margin-left: 4px;
  }
`;

const enLargeHeight = `
  input${STATION_NAME_INPUT} {
    height: 18px;
  }
`;

export default () => {
  const $head = document.querySelector("head");
  $head.innerHTML = [
    openStyleTag,
    addTableStyle,
    addMarginStyle,
    enLargeHeight,
    closeStyleTag,
  ].reduce((tag, cssRuleSet) => tag + cssRuleSet, "");
};
