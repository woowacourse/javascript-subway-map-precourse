function initHTML() {
  const buttonBox = document.createElement("div");
  buttonBox.innerHTML = `<button id="station-manager-button">1. 역 관리</button>
      <button id="line-manager-button">2. 노선 관리</button>
      <button id="section-manager-button">3. 구간 관리</button>
      <button id="map-print-manager-button">4. 지하철 노선도 출력</button>`;
  document.body.append(buttonBox);

  const mainBox = document.createElement("div");
  mainBox.id = "main-box";
  document.body.append(mainBox);
}

export { initHTML };
