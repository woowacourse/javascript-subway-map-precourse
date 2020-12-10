export const stationNameTable = `
  <table>
    <captoin class="hidden">등록된 지하철 역 목록</captoin>
    <colgroup>
      <col width="80px" />
      <col />
    </colgroup>
    <thead>
      <tr>
        <th scope="col">역 이름</th>
        <th scope="col">설정</th>
      </tr>
    </thead>
    <tbody id="station-name-tbody"></tbody>
  </table>
`;

export const lineNameTable = `
  <table>
    <captoin class="hidden">등록된 지하철 노선 목록</captoin>
    <colgroup>
      <col width="80px" />
      <col width="100px" />
      <col width="100px" />
      <col />
    </colgroup>
    <thead>
      <tr>
        <th scope="col">노선 이름</th>
        <th scope="col">상행 종점역</th>
        <th scope="col">하행 종점역</th>
        <th scope="col">설정</th>
      </tr>
    </thead>
    <tbody id="line-name-tbody"></tbody>
  </table>
`;

export const emptyMassage = (tableName) => {
  return `${tableName}이(가) 존재하지 않습니다.`;
};
