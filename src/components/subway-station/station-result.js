class StationResult {
  template() {
    return `
      <h2>🚉 지하철 역 목록</h2>
      <table>
        <thead>
          <tr>
            <th>역 이름</th>
            <th>설정</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    `;
  }
}

const stationResult = new StationResult();

export default stationResult;
