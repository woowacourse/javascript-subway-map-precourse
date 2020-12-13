export const StationManagerInnerHTML = () => `
  ${InputHTML()}
  ${TableHTML()}
`;

const InputHTML = () => `
  <p>역 이름</p>
  <Input id="station-name-input" />
  <button id="station-add-button">역 추가</button>
`;

const TableHTML = () => `
  <h3>🚉 지하철 역 목록</h3>
  <table id="station-table" border="1">
  </table>
`;

export const TableHeaderHTML = () => `
  <tr>
    <th>역 이름</th>
    <th>설정</th>
  </tr>
`;

export const TableRow = name => `
  <tr>
    <td data-name="${name}">${name}</td>
    <td ><button class="station-delete-button">삭제</button></td>
  </tr>
`;
