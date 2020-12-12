export const StationManagerHTML = () => `
  <div id="station-manager">
    ${InputHTML()}
    ${TableHTML()}
  <div>
`;

const InputHTML = () => `
  <p>역 이름</p>
  <Input id="station-name-input" />
  <button id="station-add-button">역 추가</button>
`;

const TableHTML = () => `
  <h3>🚉 지하철 역 목록</h3>
  <table id="station-table">
    <thead>
      <th>역 이름</th>
      <th>설정</th>
    </thead>
    <tbody>
    </tbody>
  </table>
`;
