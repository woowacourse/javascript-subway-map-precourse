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
    <form>
      <input type='text' placeholder='역 이름을 입력해주세요.'/>
      <button id='station-manager-button'>역 추가</button>
    </form>
    <h2>🚉 지하철 역 목록</h2>
    <table border='1px solid black' width='30%'>
      <tr>
        <th align='center'>역 이름</th>
        <th align='center'>설정</th>
      </tr>
      <tr>
        <td align="center">hello</td>
        <td align="center"><button>삭제</button></td>
      </tr>
    </table>
    `;
  }

  static LineManagerView() {
    document.getElementById('sub-view-container').innerHTML = `
    <h4>노선 이름</h4>
    <input type='text' placeholder='노선 이름을 입력해주세요.'/>
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
  SectionManagerView() {

  }
  MapPrintManagerView() {

  }
}