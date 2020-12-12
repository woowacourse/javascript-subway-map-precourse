class LineResult {
  template() {
    return `
    <h2>🚉 지하철 노선 목록</h2>
    <table>
        <thead>
          <tr>
            <th>노선 이름</th>
            <th>상행 종점역</th>
            <th>하행 종점역</th>
            <th>설정</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    `;
  }
}

const lineResult = new LineResult();

export default lineResult;
