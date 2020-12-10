export const MENU_DIV = "#menu";
export const TAB_CONTAINER_DIV = "#tab-container";
export const STATION_DIV = "#station";
export const LINE_DIV = "#Line";
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

// station
export const STATION_NAME_INPUT = "#station-name-input";
export const ADD_STATION_INPUT = "#station-add-button";
export const DELETE_STATION_INPUT = ".station-delete-button";

// Line
export const LINE_NAME_INPUT = "#Line-name-input";
export const SELECT_START_STATION = "#Line-start-station-selector";
export const SELECT_END_STATION = "#Line-end-station-selector";
export const ADD_LINE_BUTTON = "#Line-add-button";
export const DELETE_LINE_BUTTON = ".Line-delete-button";

// section
export const SELECT_LINE_BUTTON = ".section-Line-menu-button";
export const SELECT_SECTION_BUTTON = "#section-station-selector";
export const SECTION_ORDER_INPUT = "#section-order-input";
export const ADD_SECTION_BUTTON = "#section-add-button";
export const DELETE_SECTION_BUTTON = ".section-delete-button";
