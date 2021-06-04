export const clearContainer = (container) => {
  container.innerHTML = "";
};

export const createElement = (type) => {
  return typeof type === "string" && document.createElement(type);
};
