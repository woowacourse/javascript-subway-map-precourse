export const menuIDs = {
  0: "manage-station",
  1: "manage-lines",
  2: "manage-sections",
  3: "manage-map-print"
};

export const menus = document.querySelectorAll("#menu > button");
export const menuIndexArray = [...Array(menus.length).keys()];
