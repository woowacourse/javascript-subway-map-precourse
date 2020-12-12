export const displayChilds = (idValue, elementArray) => {
  const target = document.getElementById(idValue);

  elementArray.forEach((element) => target.appendChild(element));
};

export const clearChilds = (idValue) => {
  const target = document.getElementById(idValue);

  target.innerHTML = "";
};

export const removeElement = (idValue) => {
  const element = document.getElementById(idValue);

  element.parentNode.removeChild(element);
};
