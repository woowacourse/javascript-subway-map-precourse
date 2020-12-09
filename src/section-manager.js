export const showLineList = (lineList) => {
  console.log(lineList);
  const lineMenu = document.getElementById("section-line-list");
  lineMenu.innerHTML = "";
  lineList.forEach((line) => {
    const lineMenuButton = document.createElement("button");
    lineMenuButton.setAttribute("class", "section-line-menu-button");
    lineMenuButton.setAttribute("id", `${line.name}`);
    lineMenuButton.innerHTML = line.name;
    lineMenu.appendChild(lineMenuButton);
  });
};
