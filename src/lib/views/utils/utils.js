// app container div
export const $appContainer = document.querySelector("#app");

// UI에 id값 부여 시 substring 만든다.
export const getComponentIdOrClassQuerySelectorName = (querySelectorName) =>
  querySelectorName.substring(1);

export const isPrintMapTab = (tabName) => /출력/.test(tabName);
