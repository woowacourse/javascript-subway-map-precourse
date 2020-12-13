const sectionLineMenu = `
<h3>구간을 수정할 노선을 선택해주세요.</h3>
<div id="section-line-menu">
</div>
<div id="section-line-container">
</div>
`;
const sectionStationInputForm = `
<h4>구간 등록</h4>
<div>
  <select id="section-station-selector">
  </select>
  <input 
    type="number" 
    id="section-order-input"  
    placeholder="순서">
  </input>
  <button id="section-add-button">등록</button>
</div>
`;
const sectionList = `
<div id="section-list">
  <table id="section-names">
  </table>
</div>
`;
const sectionListHeader = `
<tr>
  <th>순서</th>
  <th>이름</th>
  <th>설정</th>
</tr>
`;
const sectionDeleteBtn = `
<td><button class="section-delete-button">노선에서 제거</button></td>
`;

export {
  sectionLineMenu,
  sectionStationInputForm,
  sectionList,
  sectionListHeader,
  sectionDeleteBtn,
};
