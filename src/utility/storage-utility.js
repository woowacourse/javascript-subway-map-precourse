export function saveToLocalStorage(itemName, objectToSave) {
  const jsonForm = JSON.stringify(objectToSave);
  localStorage.setItem(itemName, jsonForm);
}

export function loadFromLocalStorage(itemName) {
  let objectToLoad = JSON.parse(localStorage.getItem(itemName));
  return objectToLoad;
}
