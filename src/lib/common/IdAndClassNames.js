export const MENU_DIV = "#menu";
export const TAB_CONTAINER_DIV = "#tab-container";
export const STATION_DIV = "#station";
export const LINE_DIV = "#line";
export const SECTION_DIV = "#section";
export const MAP_DIV = "#map";

export const menuButtonsId = [
  "#station-manager-button",
  "#Line-manager-button",
  "#section-manager-button",
  "#map-print-manager-button",
];

export const tabs = [
  { title: "역", querySelector: STATION_DIV },
  { title: "노선", querySelector: LINE_DIV },
  { title: "구간", querySelector: SECTION_DIV },
  { title: "출력", querySelector: MAP_DIV },
];

export const STATION_NAME_INPUT_CONTAINER_ID = "#station-name-input-container";
export const STATION_NAME_INPUT = "#station-name-input";
export const ADD_STATION_INPUT = "#station-add-button";

export const STATION_LIST_VIEW_CONTAINER_ID = "#station-list-view-container";
export const DELETE_STATION_INPUT = ".station-delete-button";

export const LINE_NAME_INPUT_CONTAINER_ID = "#line-name-input-container";
export const LINE_NAME_INPUT = "#Line-name-input";

export const LINE_INFO_INPUT_CONTAINER_ID = "#line-info-input-container";
export const SELECT_START_STATION = "#Line-start-station-selector";
export const SELECT_END_STATION = "#Line-end-station-selector";
export const ADD_LINE_BUTTON = "#Line-add-button";

export const LINE_LIST_VIEW_CONTAINER_ID = "#station-list-view-container";
export const DELETE_LINE_BUTTON = ".Line-delete-button";

export const LINE_LIST_VIEW_BUTTON_GROUP_CONTAINER_ID =
  "station-list-view-button-group-container";
export const SELECT_LINE_BUTTON = ".section-Line-menu-button";

export const SECTION_INFO_INPUT_CONTAINER_ID = "#section-info-input-container";
export const SECTION_STATION_SELECTOR = "#section-station-selector";
export const SECTION_ORDER_INPUT = "#section-order-input";
export const ADD_SECTION_BUTTON = "#section-add-button";

export const SECTION_LIST_VIEW_CONTAINER_ID = "#section-list-view-container";
export const DELETE_SECTION_BUTTON = ".section-delete-button";
