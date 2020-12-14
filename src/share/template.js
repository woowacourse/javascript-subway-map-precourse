export const stationTableTemplate = (stationName, index, btnClass) => `
  <tr data-name="${stationName}" data-index="${index}">
    <td>${stationName}</td>
    <td><button class="${btnClass}" data-index="${index}">삭제</button></td>
  </tr>
`;

export const lineTableTemplate = (data) => {
  const { name, startStation, endStation, index, buttonClass } = data;
  return `
  <tr data-name="${name}" data-startStation="${startStation}" data-endStation="${endStation}" data-index="${index}">
    <td>${name}</td>
    <td>${startStation}</td>
    <td>${endStation}</td>
    <td><button class="${buttonClass}" data-index="${index}">삭제</button></td>
  </tr>
  `;
};

export const optionTemplate = (station) =>
  `<option value="${station}">${station}</option>`;
