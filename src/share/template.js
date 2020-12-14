export const stationTableTemplate = (stationName, index, btnClass) => `
  <tr data-name="${stationName}" data-index="${index}">
    <td>${stationName}</td>
    <td><button class="${btnClass}">삭제</button></td>
  </tr>
`;
