export default class LineManagerUI {
  constructor(contentsID, stationINFOManager) {
    this.contentsID_ = contentsID;
    this.stationINFOManager_ = stationINFOManager;
    this.setContentsHTML();
  }

  setContentsHTML() {
    document.getElementById(this.contentsID_).innerHTML = TEMPLATE;
  }
}

const TEMPLATE = `
<h2>구간을 수정할 노선을 선택해주세요.</h2>
<div>
  <button class="section-line-menu-button">1호선</button>
</div>

<div>
  <h2>1호선 관리</h2>
  <h3>구간 등록</h3>
  <p>
    <select id="section-station-selector">
    </select>
    <input type="text" id="section-order-input" placeholder="순서" />
    <button id="section-add-button">등록</button>
  </p>
  <table border="1">
    <th>순서</th>
    <th>이름</th>
    <th>설정</th>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>
        <button class="section-delete-button">노선에서 제거</button>
      </td>
  </table>

<div>
`;
