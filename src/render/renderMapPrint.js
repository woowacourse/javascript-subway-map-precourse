function mapPrintTemplate() {
  const lines = JSON.parse(localStorage.lines);
  let newHTML = `<div class="map">`;
  lines.forEach(
    (line) =>
      (newHTML += `<h3>${line.name}</h3><ul>${line.sections
        .map((section) => `<li>${section}</li>`)
        .join("")}</ul>`)
  );

  return newHTML + "</div>";
}

function initMapPrint() {
  const $mapPrintContainer = document.getElementById("map-print-container");
  $mapPrintContainer.innerHTML = mapPrintTemplate();
}

export default function renderMapPrint() {
  initMapPrint();
}
