export function clearInput() {
  const $input = document.querySelectorAll("input");
  $input.forEach((input) => (input.value = ""));
}
