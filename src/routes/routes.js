export const convertContent = (contentElements, contentName) => {
  contentElements.forEach((element) => {
    if (element.id === contentName) {
      element.setAttribute('style', 'display: block;');
    } else {
      element.setAttribute('style', 'display: none;');
    }
  });
};

export const setRouterWithElements = (
  contentElements,
) => {
  window.onhashchange = () => {
    const contentName = window.location.hash.substr(1);
    convertContent(contentElements, contentName);
  };
};

export default {
  setRouterWithElements,
  convertContent
};
