export const showLineList = (lineList) => {
  console.log(lineList);
  lineList.forEach((line) => {
    const lineMenuButton = document.createElement("button");
    const lineMenu = document.getElementById("section-line-list");
    lineMenuButton.setAttribute("class", "section-line-menu-button");
    lineMenuButton.setAttribute("id", `${line.name}`);
    lineMenuButton.innerHTML = line.name;
    lineMenu.appendChild(lineMenuButton);
  });
};
