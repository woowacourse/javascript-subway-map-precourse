export const displayChilds = (elementArray) => {
  const root = document.getElementById("root");

  elementArray.forEach((element) => root.appendChild(element));
};

export const clearChilds = () => {
  const root = document.getElementById("root");

  root.innerHTML = "";
};
