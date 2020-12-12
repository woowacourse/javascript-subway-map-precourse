export const displayShow = (dom) => {
  dom.style.display = "block";
};

export const displayhide = (dom) => {
  dom.style.display = "none";
};

export const hideOrShow = (selectedDom, doms) => {
  doms.forEach((dom) => {
    dom === selectedDom ? displayShow(dom) : displayhide(dom);
  });
};

export const showErrors = (error) => {
  alert(error);
};
