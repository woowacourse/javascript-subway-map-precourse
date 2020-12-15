export const stationInput = () => {
  return `
    <br><label>역 이름</label><br>
    <input id="station-name-input" type="text" placeholder="역 이름을 입력해주세요." />
    <button id="station-apply-btn">역 추가</button>`;
};

export const stationTable = () => {
  return `
    <h2>🚉지하철 역 목록</h2>
    <table border=1px>
      <thead>
        <tr>
          <th>역 이름</th>
          <th>설정</th>
        </tr>
      </thead>
      ${stationList(stations)}
    </table>`;
};

const stationList = (stations) => {
  let count = 0;
  return stations
    .map(
      (station) =>
        `<tr>
        <td>${station.name}</td>
        <td data-index='${count++}'>
          <button id='delete-station-btn'>삭제</button>
        </td></tr>`
    )
    .join('');
};

export const lineInput = (stations) => {
  return `
    <br><label>노선 이름</label><br>
    <input id='line-name-input' type='text' placeholder='노선 이름을 입력해주세요.'/><br><br>
    상행 종점 <select id="start-station-selector">
      ${stationSelectorOption(stations)}
    </select><br>
    하행 종점 <select id="end-station-selector">
      ${stationSelectorOption(stations)}
    </select><br><br>
    <button id="line-apply-btn">노선 추가</button>`;
};

const stationSelectorOption = (stations) => {
  return stations.map((station) => `<option>${station.name}</option>`).join('');
};

export const lineTable = (lines) => {
  return `
    <h2>🚉지하철 노선 목록</h2>
      <table border=1px>
        <thead>
          <tr>
            <th>노선 이름</th>
            <th>상행 종점역</th>
            <th>하행 종점역</th>
            <th>설정</th>
          </tr>
        </thead>
        ${lineList(lines)}
      </table>`;
};

const lineList = (lines) => {
  let count = 0;
  return lines
    .map(
      (line) =>
        `<tr>
        <td>${line.name}</td>
        <td>${line.section[0]}</td>
        <td>${line.section[line.section.length - 1]}</td>
        <td data-index='${count++}'>
          <button id='delete-line-btn'>삭제</button>
        </td>
      </tr>`
    )
    .join('');
};

export const sectionLineMenuTemplate = (lines) => {
  return `
  <h2>구간을 수정할 노선을 선택해주세요.</h2>
  ${lineNumbersToBtn(lines)}`;
};

const lineNumbersToBtn = (lines) => {
  let count = 0;
  return lines
    .map(
      (line) => `
    <button data-index='${count++}' id='lineBtn'>
    ${line.name}</button>`
    )
    .join('');
};

export const sectionInput = (line, stations) => {
  return `
  <h2>${line} 관리</h2>
  <h4>구간 등록</h4>
  <select id='section-station-selector'>${stationSelectorOption(stations)}</select>
  <input id='section-order-input' type='number' placeholder='순서'/>
  <button id='section-apply-btn'>등록</button></br></br>`;
};

export const sectionTable = (sections) => {
  return `
    <table border=1px>
      <thead>
        <tr>
          <th>순서</th>
          <th>이름</th>
          <th>설정</th>
        </tr>
      </thead>
      ${sectionList(sections)}
    </table>`;
};

const sectionList = (sections) => {
  let count = 0;
  return sections
    .map(
      (section) => `
      <tr>
        <td>${count}</td>
        <td>${section}</td>
        <td data-index='${count++}' data-name='${section}'><button id='delete-section-btn'>노선에서 제거</button></td>
      </tr>`
    )
    .join('');
};

export const mapPrint = (lines) => {
  return lines
    .map(
      (line) => `
    <h3>${line.name}</h3>
    <ul>
      ${showSection(line.section)}
    </ul>`
    )
    .join('');
};

const showSection = (sections) => {
  return sections.map((section) => `<li>${section}</li>`).join('');
};
