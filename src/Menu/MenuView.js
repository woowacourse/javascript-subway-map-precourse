export default class MenuView {
  static MenuButtonListView() {
    document.getElementById('app').innerHTML += `
    <button id="station-manager-button">1.역 관리</button>
    <button id="line-manager-button">2. 노선 관리</button>
    <button id="section-manager-button">3. 구간 관리</button>
    <button id="map-print-manager-button">4. 지하철 노선도 출력</button>
    <div id="sub-view-container"></div>
    `;
  }

  static StationManagerView() {
    document.getElementById('sub-view-container').innerHTML = `
    <h4>역 이름</h4>
    <div id="station-input-view"></div>
    <h2>🚉 지하철 역 목록</h2>
    <div id="station-table-view"></div>
    `;
    this.StationInputView();
    this.StationTableView();
  }

  static StationInputView() {
    document.getElementById('station-input-view').innerHTML = `
    <input type='text' placeholder='역 이름을 입력해주세요.'/>
    <button id='station-manager-button'>역 추가</button>
    `;
  }

  static StationTableView() {
    const stations = localStorage.getItem('Stations').split(',');
    document.getElementById('station-table-view').innerHTML = `
    <table border='1px solid black'>
      <tr>
        <th align="center">역 이름</th>
        <th align="center">설정</th>
      </tr>
      ${stations.map((station) => `
      <tr>
        <td aligh="center">${station}</td>
        <td><button id="delete">삭제</button></td>
      </tr>`).join('')}
    </table>`;
  }

  static LineManagerView() {
    document.getElementById('sub-view-container').innerHTML = `
    <h4>노선 이름</h4>
    <input type='text' placeholder='노선 이름을 입력해주세요.'/>
    <p>상행 종점
      <select>
        <option value='incheon'>인천</option>
        <option value='seoul'>서울역</option>
        <option value='soyosan'>소요산</option>
      </select>
    </p>
    <p>하행 종점
      <select>
        <option value='incheon'>인천</option>
        <option value='seoul'>서울역</option>
        <option value='soyosan'>소요산</option>
      </select>
    </p>
    <button id='station-manager-button'>노선 추가</button>
    <h2>🚉 지하철 노선 목록</h2>
    <table border='1px solid black'>
      <tr>
        <th align='center'>노선 이름</th>
        <th align='center'>상행 종점역</th>
        <th align='center'>하행 종점역</th>
        <th algin='center'>설정</th>
      </tr>
      <tr>
        <td align="center">1호선</td>
        <td align="center">인천</td>
        <td align="center">소요산</td>
        <td align="center"><button id='delete'>삭제</button></td>
      </tr>
    </table>
    `;
  }

  static SectionManagerView() {
    document.getElementById('sub-view-container').innerHTML = `
    <h3>구간을 수정할 노선을 선택해주세요.</h3>
    <button id='line1'>1호선</button>
    <button id='line2'>2호선</button>
    <button id='line3'>3호선</button>
    <div id='each-line-manager' hidden='true'>
      <h3>1호선 관리</h3>
      <h4>구간 등록</h4>
      <select>
        <option value='incheon'>인천</option>
        <option value='seoul'>서울역</option>
        <option value='soyosan'>소요산</option> 
      </select>
      <input type='number' min='0' placeholder='순서'/>
      <button id='add'>등록</button>
      <br/>
      <br/>
      <br/>
      <table border='1px solid black'>
      <tr>
        <th align='center'>순서</th>
        <th align='center'>이름</th>
        <th algin='center'>설정</th>
      </tr>
      <tr>
        <td align="center">1</td>
        <td align="center">인천</td>
        <td align="center"><button id='delete'>노선에서 제거</button></td>
      </tr>
    </table>
    </div>
    `;
  }

  static MapPrintManagerView() {
    document.getElementById('sub-view-container').innerHTML = `
    <h3>1호선</h3>
    <ul>
      <li>인천</li>
      <li>소요산</li> 
    </ul>
    <h3>2호선</h3>
    <ul>
      <li>시청</li>
      <li>신도림</li> 
    </ul>
    `;
  }
}
