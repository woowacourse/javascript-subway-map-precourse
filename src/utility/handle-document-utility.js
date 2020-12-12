export function getInputTextByID(id) {
  return document.getElementById(id).value.trim();
}
export function getAllElementsByClass(className) {
  return document.querySelectorAll("." + className);
}
export function getSelectedOptionByID(id) {
  const selector = document.getElementById(id);
  return selector[selector.selectedIndex].value;
}
