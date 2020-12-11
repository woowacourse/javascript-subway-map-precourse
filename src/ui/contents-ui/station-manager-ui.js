export default class StationManagerUI {
  constructor({ contentsContainer }) {
    this.contentsContainer_ = contentsContainer;
    this.setHTML();
  }

  setHTML() {
    this.contentsContainer_.innerHTML = TEMPLATE;
  }
}

const TEMPLATE = `
역 이름<br>
<input type="text" placeholder="역 이름을 입력해주세요." id=""/>
<button id="">역 추가</button>
<h2>🚉 지하철 역 목록</h2>
<table border="1">
  <th>역 이름</th>
  <th>설정</th>
  <tr>
    <td>첫번째 칸</td>
    <td>두번째 칸</td>
  </tr>
</table>
`;
