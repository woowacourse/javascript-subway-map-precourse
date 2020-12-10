export const getChildById = (parent, id) => {
  const childrenList = parent.children;
  for (let i = 0; i < childrenList.length; i++) {
    if (childrenList[i].id === id) {
      return childrenList[i];
    }
  }

  return null;
};

export const turnOnNoDataMessage = ($table, $noDataMessage) => {
  $table.style.display = "none";
  $noDataMessage.style.display = "block";
};

export const turnOffNoDataMessage = ($table, $noDataMessage) => {
  $table.style.display = "block";
  $noDataMessage.style.display = "none";
};
