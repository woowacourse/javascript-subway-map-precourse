export const createDiv = (text, style = "") => {
  const div = document.createElement("div");

  div.innerText = text;
  div.style = style;

  return div;
};

export const createInput = (idValue = "", placeholder = "", type = "text") => {
  const input = document.createElement("input");

  input.setAttribute("id", idValue);
  input.type = type;
  input.placeholder = placeholder;

  return input;
};

export const createButton = (idValue = "", classValue = "", text) => {
  const button = document.createElement("button");

  button.setAttribute("id", idValue);
  button.setAttribute("class", classValue);
  button.innerText = text;

  return button;
};
