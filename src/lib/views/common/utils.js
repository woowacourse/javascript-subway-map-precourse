export const $appContainer = document.querySelector("#app");

export const getComponentIdOrClassQuerySelectorName = (querySelectorName) =>
  querySelectorName.substring(1);

export const isPrintMapTab = (tabName) => /출력/.test(tabName);
