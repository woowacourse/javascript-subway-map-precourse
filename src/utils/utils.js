import { container } from "../consts/consts.js";

export const clearContainer = () => {
  container.innerHTML = "";
};

export const createElement = (type) => {
  return typeof type === "string" && document.createElement(type);
};

export const createLineObject = (startStation, endStation) => {
  return { start: startStation, end: endStation };
};
