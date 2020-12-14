export const stationTableTemplate = (stationName, index, btnClass) => `
  <tr data-name="${stationName}" data-index="${index}">
    <td>${stationName}</td>
    <td><button class="${btnClass}" data-index="${index}">삭제</button></td>
  </tr>
`;

export const optionTemplate = (station) => `<option value="${station}">${station}</option>`;
