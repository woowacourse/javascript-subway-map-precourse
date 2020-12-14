import Component from "../core/Component.js";

export default class SectionManager extends Component {
  constructor() {
    super();
  }

  render() {
    return `
    <div>
      <h3>구간을 수정할 노선을 선택해주세요.</h3>
      <button class="section-line-menu-button">1호선</button>
      <button>2호선</button>
      <button>3호선</button>
    </div>
    <div>
      <h3>1호선 관리</h3>
      <h4>구간 등록</h4>
      <select id="section-station-selector"></select>
      <input id="section-order-input" placeholder="순서">
      <button id="section-add-button">등록</button>
    </div>
    <table style="margin-top: 25px;">
      <thead>
        <tr>
          <td>순서</td>
          <td>이름</td>
          <td>설정</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0</td>
          <td>인천</td>
          <td>
            <button class="section-delete-button">노선에서 제거</button>
          </td>
        </tr>
      </tbody>
    </table>
  `;
  }
}
