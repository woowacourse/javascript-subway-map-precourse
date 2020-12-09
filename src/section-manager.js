export const onClickedLine = (lineName) => {
  const targetLine = lineName;
  const targetLineElement = document.getElementById("section-line");
  targetLineElement.style.display = "Block";
  const sectionManagerTitle = document.getElementById("section-line-name");
  sectionManagerTitle.innerHTML = `${targetLine} 관리`;
};
export const showLineList = (lineList) => {
  console.log(lineList);
  const lineMenu = document.getElementById("section-line-list");
  lineMenu.innerHTML = "";
  lineList.forEach((line) => {
    const lineMenuButton = document.createElement("button");
    lineMenuButton.setAttribute("class", "section-line-menu-button");
    lineMenuButton.setAttribute("id", `${line.name}`);
    lineMenuButton.onclick = () => {
      onClickedLine(`${line.name}`);
    };
    lineMenuButton.innerHTML = line.name;
    lineMenu.appendChild(lineMenuButton);
  });
};
