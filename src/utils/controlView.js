import { STATION_DIV } from "../constant.js";
export const cleanView = () => {
  const children = document.getElementById("app").children;
  for (let i = STATION_DIV; i < children.length; i += 1) {
    children[i].style.display = "none";
  }
};

export const cleanPreView = (num) => {
  const children = document.getElementById("app").children;
  for (let i = STATION_DIV; i < children.length; i += 1) {
    if (i !== num) children[i].style.display = "none";
  }
};

export const controlDisplay = (child) => {
  child.style.display === "none"
    ? (child.style.display = "")
    : (child.style.display = "none");
};
