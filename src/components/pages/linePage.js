import { LINE_NAME_INPUT, LINE_START_STATION_SELECTOR, LINE_END_STATION_SELECTOR, LINE_ADD_BUTTON, LINE_DELETE_BUTTON } from "../../constants/tag.js";

function lineManagerPage(subwayDatas) {
  let options = subwayDatas.subwayStations.map((station) => `<option value = "${station.name}">${station.name}</option>`);
  let table = ``;

  subwayDatas.lines &&
    subwayDatas.lines.forEach(
      (line) =>
        (table += `<tr>
            <td>${line.name}</td>
            <td>${line.stops[0]}</td>
            <td>${line.stops[line.stops.length - 1]}</td>
            <td><button class=${LINE_DELETE_BUTTON}>삭제</button></td>
          </tr>`)
    );

  let lineManager = `
            <h4>노선 이름<h4>
            <input id = ${LINE_NAME_INPUT} value = "노선 이름을 입력해주세요."></input>
            <br />
            <br />
            <label>상행 종점</label>
            <select id=${LINE_START_STATION_SELECTOR}>
            ${options}
            </select> 
            <br />
            <label>하행 종점</label>
            <select id=${LINE_END_STATION_SELECTOR}>
            ${options}
            </select>
            <br />
            <br />
            <button id = ${LINE_ADD_BUTTON}>노선 추가</button>
            <h3>🚉지하철 노선 목록</h3>
            <table border = 1px solid black>
              <thead>
                <tr>
                  <th>노선 이름</th>
                  <th>상행 종점역</th>
                  <th>하행 종점역</th>
                  <th>설정</th>
                </tr>
              </thead>
              <tbody>
                ${table}
              </tbody>
            </table>
            `;

  return lineManager;
}

export default lineManagerPage;
