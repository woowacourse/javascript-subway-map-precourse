export const lineMenuPresenter = lineData => {
  const lineMenuContainer = document.querySelector("#line-menu-container");
  let lineMenu = "";
  for (const line of lineData) {
    lineMenu += `
      <button data-lineNumber=${line[0]} id="line-menu-button">${line[0]}</button>
    `;
  }
  lineMenuContainer.innerHTML = lineMenu;
};
