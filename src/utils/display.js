export const displayChilds = (idValue, elementArray) => {
  const target = document.getElementById(idValue);

  elementArray.forEach((element) => target.appendChild(element));
};

export const clearChilds = (idValue) => {
  const target = document.getElementById(idValue);

  target.innerHTML = "";
};
