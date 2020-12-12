export function getInputTextByID(id) {
  return document.getElementById(id).value.trim();
}
export function getAllElementsByClass(className) {
  return document.querySelectorAll("." + className);
}
