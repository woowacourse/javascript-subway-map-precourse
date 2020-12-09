const MANAGERS_ID = [
  "station-manager",
  "line-manager",
  "section-manager",
  "map-print-manager",
];

const getChildById = (parentElement, id) => {
  const childrenList = parentElement.children;
  for (let i = 0; i < childrenList.length; i++) {
    if (childrenList[i].id === id) {
      return childrenList[i];
    }
  }

  return null;
};

const showManagerPageById = (container, id) => {
  MANAGERS_ID.forEach((_managersId) => {
    if (_managersId === id) {
      getChildById(container, _managersId).style.display = "block";
    } else {
      getChildById(container, _managersId).style.display = "none";
    }
  });
};

export function menuButtonHandler(e) {
  if (e.target.id === "station-manager-button") {
    showManagerPageById(e.target.closest("#app"), "station-manager");
  }
}
