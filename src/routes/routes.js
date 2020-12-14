const convertContent = (contentElements, contentName) => {
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
  defaultContentElement
) => {
  window.onhashchange = () => {
    const contentName = window.location.hash;
    convertContent(contentElements, contentName);
  };
  window.onload = () => {
    convertContent(contentElements, defaultContentElement.id);
  };
};

export default {
  setRouterWithElements,
};
