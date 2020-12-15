function mapPrintManagerPage(subwayDatas) {
  const map = subwayDatas.lines.reduce((prev, line) => {
    const insideOfUl = line.stops.reduce((prev, stop) => prev + `<li style="padding-left: 20px">${stop}</li>`, "");
    return prev + `<ul style="list-style-position: inside">${line.name}${insideOfUl}</ul>`;
  }, "");

  return `<div class="map">${map}</div>`;
}

export default mapPrintManagerPage;
